import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthLoginResponse } from "../../interfaces/auth-login-response.interface";
import { LoginFormComponent } from "../../components/login-form/login-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
})

export class LoginPageComponent {
  constructor(private router: Router) { }

  handleLoginSuccess(user: AuthLoginResponse) {
    switch (user.tipoUsuario) {
      case 'ADMIN':
        this.router.navigate(['/dashboard-admin']);
        break;
      case 'EMPLEADO':
        this.router.navigate(['/dashboard-empleado']);
        break;
      default:
        this.router.navigate(['/cliente']);
        break;
    }
  }
}
