import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/pages/login/login-page.component';
import { LandingPageComponent } from './features/client/pages/landing-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'landing', component: LandingPageComponent }
];
