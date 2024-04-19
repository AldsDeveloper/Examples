import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './views/error/error.component';
import { IndexComponent } from './views/index/index.component';
import { DefineComponent } from './views/define/define.component';
import { ExamsComponent } from './views/exams/exams.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { FilePondModule } from 'ngx-filepond';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { ResultComponent } from './views/result/result.component';
import { InputComponent } from './views/input/input.component';
import { ModelsComponent } from './models/models.component';


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
    SigninComponent,
    SignupComponent,
    ResultComponent,
    InputComponent,
    ModelsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MonacoEditorModule,
    ReactiveFormsModule,
    EditorModule,
    FilePondModule,

  ],
  providers: [
    {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.30.1/min/vs',
    },
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
