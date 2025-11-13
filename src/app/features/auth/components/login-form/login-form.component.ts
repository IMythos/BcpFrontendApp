import { Component, EventEmitter, inject, Output, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { AuthLoginRequest } from "../../interfaces/auth-login-request.interface";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthLoginResponse } from "../../interfaces/auth-login-response.interface";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html'
})

export class LoginFormComponent {
  readonly formBuilder = inject(FormBuilder);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  @Output() loginSuccess = new EventEmitter<AuthLoginResponse>();

  message = signal<string>('');
  loading = signal<boolean>(false);

  loginForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(5)]],
    tipoUsuario: ['CLIENTE', [Validators.required]]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload: AuthLoginRequest = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.loginSuccess.emit(res);
      },
      error: () => {
        this.loading.set(false);
        this.message.set('Usuario o contraseña incorrectos.');
      }
    });
  }

  get username(): any {
    return this.loginForm.get('nombre');
  }

  get contrasena(): any {
    return this.loginForm.get('contrasena');
  }
}
