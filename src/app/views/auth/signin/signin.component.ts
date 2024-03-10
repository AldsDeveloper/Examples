import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterLinkActive,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  user = { email: '', password: '', remember: false };

  constructor(private authService: AuthService , private router: Router) {}
  onSubmit(): void {
    if (this.authService.login(this.user.email, this.user.password, this.user.remember)) {
      // ล็อกอินสำเร็จ
      alert('Login successfully');
      this.router.navigate(['/define']);
    } else {
      // ล็อกอินไม่สำเร็จ
    }
  }
}
