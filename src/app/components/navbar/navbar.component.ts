import { Component } from '@angular/core';
import { AuthService } from '../../../app/services/auth.service';
import { Router, RouterLink, RouterLinkActive,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}
  onLogout() {
    if (this.authService.logout()) {
      alert('You has Logout successfully');
      this.router.navigate(['/']);
    } else {
      alert('Failed to Logout! ,Please contract admin')
    }
  }

}
