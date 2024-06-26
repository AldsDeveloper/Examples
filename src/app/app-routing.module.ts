import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent } from './views/error/error.component';
import { IndexComponent } from './views/index/index.component';
import { DefineComponent } from './views/define/define.component';
import { ExamsComponent } from './views/exams/exams.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { DefineGuardService } from './middleware/auth.middleware';
import { AuthService } from './services/auth.service';
import { ResultComponent } from './views/result/result.component';
import { InputComponent } from './views/input/input.component';

const routes: Routes = [
  { path: "exams/:userId", title:"Exams", component: ExamsComponent },
  { path: "define", title:"Define Exams", component: DefineComponent, canActivate: [DefineGuardService] },
  { path: "result", title:"Results Exams", component: ResultComponent, canActivate: [DefineGuardService] },
  { path: "admin/signin", title:"Admin signin", component: SigninComponent },
  { path: "admin/signup", title: "Admin signup", component: SignupComponent },
  { path: "input", title: "Input", component: InputComponent },
  { path: "", component: IndexComponent },
  { path: '**', component: ErrorComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
