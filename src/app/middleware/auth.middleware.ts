import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DefineGuardService implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) { }

  canActivate(): boolean {
    const token = this.cookieService.get('token');
    // alert(token)
    if (!token) {
      this.router.navigate(['/admin/signin']);
      alert('Access denied. Please sign in.');
      return false;
    }
    return true;
  }
}
