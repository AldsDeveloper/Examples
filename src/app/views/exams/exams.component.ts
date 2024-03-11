import { Component, OnInit ,NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { MonocoEditor } from '../../services/ngx.monoco';
import { MonacoEditorComponent, MonacoEditorConstructionOptions, MonacoEditorLoaderService, MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';


@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})

export class ExamsComponent implements OnInit {

  unansweredIndex: number = -1;
  questions: {
              question: string;
              answer: string;
              path: string;
              type: string;
              note: string;
  }[] = [];
  userId: any;
  currentQuestionIndex: number = 0;
  isSubmitted: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient , private router: Router,private monacoLoaderService: MonacoEditorLoaderService,) { }

  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent;

  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark', language: 'javascript'
  };

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.fetchQuestionsExams();
    console.log(this.userId);
  }

  fetchQuestionsExams(): void {
    this.http.post('http://localhost:3000/fetch/questions/exams', {}).subscribe((data: any) => {
      this.questions = data.questions.map((q: any) => ({
        question: q.question,
        answer: '',
        path: q.path,
        type: q.type,
        note: q.note
      }));
      console.log(this.questions);
    });
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.unansweredIndex = -1;
    }
  }

  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.unansweredIndex = -1;
    }
  }

  submitForm(): void {
    this.unansweredIndex = this.questions.findIndex(question => !question.answer.trim());
    if (this.unansweredIndex !== -1) {
      alert(`You have not answered question ${this.unansweredIndex + 1}`);
      this.currentQuestionIndex = this.unansweredIndex;
    } else {
      const payload = {
        userId: this.userId,
        answers: this.questions.map(q => q.answer)
      };
      console.log(payload);
      // return

      this.http.post('http://localhost:3000/submit/answers', payload).subscribe(response => {
        console.log('Server response:', response);
        alert('Form submitted!');
        this.router.navigate(['/']);
      }, error => {
        console.error('Error submitting form:', error);
        alert('Error submitting form!');
      });
    }
  }


}
