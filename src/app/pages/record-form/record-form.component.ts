import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { CanComponentDeactivate, Category, Product } from '../../core/models';

type Entity = 'product' | 'category';
type Mode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'app-record-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './record-form.component.html',
  styleUrl: './record-form.component.scss'
})
export class RecordFormComponent implements OnInit, CanComponentDeactivate {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);

  readonly loading = signal(false);
  readonly saved = signal(false);
  readonly entity = this.route.snapshot.data['entity'] as Entity;
  readonly mode = this.route.snapshot.data['mode'] as Mode;
  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    price: [0],
    description: [''],
    image: ['']
  });

  ngOnInit(): void {
    if (this.mode === 'create') {
      return;
    }

    this.loading.set(true);
    const request: Observable<Product | Category> =
      this.entity === 'product' ? this.api.product(this.id) : this.api.category(this.id);

    request.pipe(finalize(() => this.loading.set(false))).subscribe((record) => {
      if ('title' in record) {
        this.form.patchValue({
          name: record.title,
          price: record.price,
          description: record.description,
          image: record.images?.[0] || ''
        });
      } else {
        this.form.patchValue({
          name: record.name,
          image: record.image
        });
      }
      this.form.markAsPristine();
    });
  }

  canDeactivate(): boolean {
    if (this.saved() || this.form.pristine || this.mode === 'delete') {
      return true;
    }

    return confirm('Existem alterações não salvas. Deseja sair mesmo assim?');
  }

  submit(): void {
    if (this.mode !== 'delete' && this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saved.set(true);
    this.router.navigateByUrl(this.entity === 'product' ? '/products' : '/categories');
  }

  title(): string {
    const subject = this.entity === 'product' ? 'produto' : 'categoria';
    const action = this.mode === 'create' ? 'Cadastrar' : this.mode === 'edit' ? 'Editar' : 'Excluir';
    return `${action} ${subject}`;
  }

  backUrl(): string {
    return this.entity === 'product' ? '/products' : '/categories';
  }
}
