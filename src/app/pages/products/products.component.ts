import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, finalize, forkJoin } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Category, Product } from '../../core/models';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly fb = inject(FormBuilder);

  readonly products = signal<Product[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly loading = signal(true);
  readonly totalValue = computed(() => this.products().reduce((sum, item) => sum + item.price, 0));
  readonly filters = this.fb.nonNullable.group({
    title: [''],
    categoryId: [''],
    minPrice: [''],
    maxPrice: ['']
  });

  ngOnInit(): void {
    forkJoin({
      products: this.api.products(this.filters.getRawValue()),
      categories: this.api.categories()
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(({ products, categories }) => {
        this.products.set(products);
        this.categories.set(categories);
      });

    this.filters.valueChanges.pipe(debounceTime(350)).subscribe(() => this.search());
  }

  search(): void {
    this.loading.set(true);
    this.api
      .products(this.filters.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((products) => this.products.set(products));
  }

  clear(): void {
    this.filters.reset({ title: '', categoryId: '', minPrice: '', maxPrice: '' });
  }

  image(product: Product): string {
    return product.images?.[0] || 'https://placehold.co/600x400?text=Produto';
  }
}
