import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly apiUrl = 'https://api.escuelajs.co/api/v1';

  constructor(private readonly http: HttpClient) {}

  products(filters: { title?: string; categoryId?: string; minPrice?: string; maxPrice?: string }): Observable<Product[]> {
    let params = new HttpParams().set('offset', 0).set('limit', 40);
    if (filters.title) params = params.set('title', filters.title);
    if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters.minPrice) params = params.set('price_min', filters.minPrice);
    if (filters.maxPrice) params = params.set('price_max', filters.maxPrice);
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }

  product(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  categories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  category(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }
}
