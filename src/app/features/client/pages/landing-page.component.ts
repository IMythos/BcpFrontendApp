import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})

export class LandingPageComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  menuOpen = signal(false);
  closingMenu = signal(false);

  isAuthenticated = computed(() => this.authService.isAuthenticated());

  userRole = computed(() => this.authService.getRole());
  userName = computed(() => this.authService.userName());

  constructor() {
    this.authService.loadUserFromToken();
  }

  toggleMenu(): void {
    if (this.menuOpen()) {
      this.closingMenu.set(true);
      setTimeout(() => {
        this.menuOpen.set(false);
        this.closingMenu.set(false);
      }, 300);
    } else {
      this.menuOpen.set(true);
    }
  }

  handleAuthAction(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
