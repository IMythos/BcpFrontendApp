import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ClientRegister } from "../interfaces/client-register.interface";
import { AuthLoginResponse } from "../interfaces/auth-login-response.interface";
import { AuthLoginRequest } from "../interfaces/auth-login-request.interface";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  readonly API_AUTH_USER: string = 'http://localhost:8080/auth';
  readonly httpClient = inject(HttpClient);

  userName = signal<string | null>(null);

  login(user: AuthLoginRequest): Observable<AuthLoginResponse> {
    return this.httpClient.post<AuthLoginResponse>(`${this.API_AUTH_USER}/login`, user).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.tipoUsuario);

        const decoded = this.decodeToken(res.token);
        this.userName.set(decoded?.sub ?? decoded?.nombre ?? 'Usuario')
      })
    );
  }

  getRole(): string | null {
    return localStorage.getItem('rol');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    } catch (e) {
      console.error('Error al decodificar el token', e);
      return null;
    }
  }

  loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      this.userName.set(decoded?.sub ?? decoded?.nombre ?? 'Usuario');
    }
  }
}
