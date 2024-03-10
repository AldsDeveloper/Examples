import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { SigninComponent } from '../views/auth/signin/signin.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isLoggedIn: boolean = false;
  private rememberMe: boolean = false;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.rememberMe = JSON.parse(localStorage.getItem('rememberMe') || 'false');
    if (this.rememberMe) {
      this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
    }
  }

  login(email: string, password: string, rememberMe: boolean): boolean {
    const token = this.tokenService.generateToken(email, 'admin');


    console.log(email);
    console.log(token);
    console.log(password);
    console.log(rememberMe);

    this.http.post<any>('http://localhost:3000/auth/admin/login', { email, password, rememberMe, token }).subscribe((response) => {
        console.log(response);
        alert('Login successfully');
        // location.reload();
      }, (error) => {
        console.error(error);
        alert('Failed to login');
    });

    return true;
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
