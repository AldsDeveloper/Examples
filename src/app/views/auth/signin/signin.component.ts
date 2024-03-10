import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {


  user = { email: '', password: '', remember: false};


  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.authService.login(this.user.email, this.user.password, this.user.remember)) {
      // ล็อกอินสำเร็จ
    } else {
      // ล็อกอินไม่สำเร็จ
    }
  }
}
