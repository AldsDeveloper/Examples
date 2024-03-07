import { Component, OnInit ,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-define',
  templateUrl: './define.component.html',
  styleUrls: ['./define.component.scss']
})



export class DefineComponent implements OnInit {

  questions: {
isCode: any; id: number, content: string, code: number
}[] = [];

  @ViewChild(EditorComponent, { static: false }) editorComponent!: EditorComponent;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit(): void {
    this.questions.push({
      id: 0, content: '', code: 0,
      isCode: undefined
    });
    this.getQuestions();
    console.log(this.questions);
  }


  getQuestions(): void {
    this.http.post('http://localhost:3000/fetch/questions', {}).subscribe((data: any) => {
      this.questions = data;
      console.log(this.questions);
      if (this.questions.length > 0) {
        this.editorComponent.editor.setContent(this.questions[0].content);
      }
    });
  }


  onCheckboxChange(event: any, index: number): void {
    const isChecked = event.target.checked;
    this.questions[index].isCode = isChecked;
    const questionId = this.questions[index].id;

    this.http.put(`http://localhost:3000/update/question/${questionId}`, { isCode: isChecked }).subscribe((response) => {
      console.log(response);
      alert('Question updated successfully');
    }, (error) => {
      console.error(error);
      alert('Failed to update question');
    });
  }


  addQuestion(): void {
    const newId = this.questions.length > 0 ? Math.max(...this.questions.map(q => q.id)) + 1 : 1;
    const newQuestion = { id: newId, content: '', code: 0, isCode: false };
    this.questions.push(newQuestion);
    this.cdr.detectChanges();
  }


  submitForm(): void {
    this.http.post('http://localhost:3000/submit/questions', { questions: this.questions }).subscribe((response) => {
      console.log(response);
      alert('Form submitted successfully');
    }, (error) => {
      console.error(error);
      alert('Failed to submit form');
    });
  }


  deleteQuestion(index: number): void {
    if (this.questions.length === 1) {
      // Show alert message or disable delete button
      alert('Cannot delete the last question.');
      return;
    }

    const questionToDelete = this.questions[index];
    const questionIdToDelete = questionToDelete.id;

    console.log('Deleting question:', questionToDelete.content);
    this.questions.splice(index, 1);

    this.http.delete(`http://localhost:3000/delete/question/${questionIdToDelete}`).subscribe((response) => {
      console.log(response);
      alert('Deleting question successfully');
    }, (error) => {
      console.error(error);
      alert('Failed to delete question');
    });
  }




  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  editorConfig = {
    height: 300,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor',
      'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount'
    ],

    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    '| image | removeformat| print | help ',

    file_picker_callback: function(
      callback: (fileUrl: string, metadata: { alt: string }) => void,
      value: string,
      meta: Record<string, any>
    ) {
      if (meta['filetype'] === 'image') {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = function() {
          if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = function() {
              callback(reader.result as string, { alt: file.name });
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      }
    }
  };
}
