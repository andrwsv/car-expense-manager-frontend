import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'car_expense_token';
  private readonly API_URL = 'http://localhost:3000/api'; // Cambiar por tu API real
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Signal para el estado de autenticación
  public isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkTokenOnInit();
  }

  private checkTokenOnInit(): void {
    const token = this.getToken();
    if (token && this.isTokenValid(token)) {
      this.isAuthenticated.set(true);
      // Aquí podrías obtener los datos del usuario del token o hacer una llamada a la API
      this.getUserFromToken(token);
    } else {
      this.logout();
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.currentUserSubject.next(response.user);
          this.isAuthenticated.set(true);
        }),
        catchError(error => {
          console.error('Error de login:', error);
          return of(null as any);
        })
      );
  }

  // Método temporal para simular login (eliminar cuando tengas API real)
  loginDemo(credentials: LoginRequest): Observable<LoginResponse> {
    // Simulación de login para desarrollo
    if (credentials.email === 'demo@test.com' && credentials.password === '123456') {
      const mockResponse: LoginResponse = {
        token: this.generateMockToken(),
        user: {
          id: 1,
          email: credentials.email,
          name: 'Usuario Demo'
        }
      };
      
      this.setToken(mockResponse.token);
      this.currentUserSubject.next(mockResponse.user);
      this.isAuthenticated.set(true);
      
      return of(mockResponse);
    } else {
      throw new Error('Credenciales inválidas');
    }
  }

  private generateMockToken(): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: '1',
      email: 'demo@test.com',
      name: 'Usuario Demo',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas
    }));
    const signature = 'mock-signature';
    return `${header}.${payload}.${signature}`;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  private getUserFromToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user: User = {
        id: parseInt(payload.sub),
        email: payload.email,
        name: payload.name
      };
      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Error al extraer usuario del token:', error);
      this.logout();
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
