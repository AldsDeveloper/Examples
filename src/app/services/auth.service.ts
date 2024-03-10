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

  }

  login(email: string, password: string, remember: boolean): boolean {

    this.http.post<any>('http://localhost:3000/auth/admin/login', { email, password, remember}).subscribe((response) => {
      console.log(response);
      return
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
