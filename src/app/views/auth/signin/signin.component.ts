import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterLinkActive,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {

  formData = { email: '', password: '', rememberMe: false };

  constructor(private authService: AuthService) {}

  onSubmit(event: Event): void {
    event.preventDefault(); // ป้องกัน form ไม่ให้รีเฟรชหน้า

    if (this.authService.login(this.formData.email, this.formData.password, this.formData.rememberMe)) {
      // ล็อกอินสำเร็จ
    } else {
      // ล็อกอินไม่สำเร็จ
    }
  }

}
