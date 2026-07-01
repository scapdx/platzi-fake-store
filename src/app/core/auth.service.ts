import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthTokens } from './models';

const TOKEN_KEY = 'platzi_fake_store_token';
const REFRESH_KEY = 'platzi_fake_store_refresh';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'https://api.escuelajs.co/api/v1';
  private readonly tokenState = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly isAuthenticated = computed(() => Boolean(this.tokenState()));

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(email: string, password: string): Observable<AuthTokens> {
    return this.http
      .post<AuthTokens>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(tap((tokens) => this.storeTokens(tokens)));
  }

  token(): string | null {
    return this.tokenState();
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    this.tokenState.set(null);
    this.router.navigateByUrl('/login');
  }

  private storeTokens(tokens: AuthTokens): void {
    localStorage.setItem(TOKEN_KEY, tokens.access_token);
    localStorage.setItem(REFRESH_KEY, tokens.refresh_token);
    this.tokenState.set(tokens.access_token);
  }
}
