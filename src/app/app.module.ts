import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './views/error/error.component';
import { IndexComponent } from './views/index/index.component';
import { DefineComponent } from './views/define/define.component';
import { ExamsComponent } from './views/exams/exams.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ComponentsComponent } from './components/components.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    IndexComponent,
    DefineComponent,
    ExamsComponent,
    NavbarComponent,
    FooterComponent,
    LayoutsComponent,
    ComponentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    HttpClientModule,

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
