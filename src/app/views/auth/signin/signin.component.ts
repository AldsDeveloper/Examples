import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(event: Event): void {
    event.preventDefault(); // ป้องกัน form ไม่ให้รีเฟรชหน้า




    if (this.authService.login(this.email, this.password, this.rememberMe)) {
      // ล็อกอินสำเร็จ
    } else {
      // ล็อกอินไม่สำเร็จ
    }
  }

}
