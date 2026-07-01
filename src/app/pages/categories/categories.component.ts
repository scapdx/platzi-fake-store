import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Category } from '../../core/models';

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly fb = inject(FormBuilder);

  readonly categories = signal<Category[]>([]);
  readonly loading = signal(true);
  readonly filter = this.fb.nonNullable.group({ name: [''] });

  filteredCategories(): Category[] {
    const query = this.filter.controls.name.value.trim().toLowerCase();
    return this.categories().filter((category) => category.name.toLowerCase().includes(query));
  }

  ngOnInit(): void {
    this.api.categories().subscribe((categories) => {
      this.categories.set(categories);
      this.loading.set(false);
    });
  }
}
