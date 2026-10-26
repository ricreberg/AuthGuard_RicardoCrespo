import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/angular';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
  FormsModule,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
],
})
export class LoginPage {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  username = '';
  password = '';
  error = '';

  login(): void {
    this.error = '';

    if (!this.auth.login(this.username, this.password)) {
      this.error = 'Usuario o contraseña incorrectos.';
      return;
    }

    this.password = '';

    const destination =
      this.auth.user()?.role === 'admin' ? '/admin' : '/user-dashboard';

    void this.router.navigateByUrl(destination, { replaceUrl: true });
  }
}