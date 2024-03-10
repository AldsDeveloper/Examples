import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { SigninComponent } from '../views/auth/signin/signin.component';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuth: boolean = false;
  private rememberMe: boolean = false;

  constructor(private http: HttpClient, private tokenService: TokenService , private cookieService: CookieService) {}

  login(email: string, password: string, remember: boolean): boolean {
    const sub = this.http.post<any>('http://localhost:3000/auth/admin/login', { email, password, remember}).subscribe(
      (response) => {
        console.log(response);
        if (response.token) {
          this.cookieService.set('token', response.token, { expires: remember ? 365 : 1 });
          this.cookieService.set('userId', response.userId, { expires: remember ? 365 : 1 });
          this.isAuth = true
        } else {
          alert(`Failed to login: ${response.error}`);
        }
      },
      (error) => {
        console.error(error);
        alert('An error occurred. Please try again later.');
        return false
      }
    );
    return true;
  }

  logout(): void {
    this.isAuth = false
    this.cookieService.delete('token');
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }
}
