import { Component, OnInit, ViewChild, ElementRef,NgModule   } from '@angular/core';
import { Router, RouterLink, RouterLinkActive,ActivatedRoute } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import * as FilePond from 'filepond';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-define',
  templateUrl: './define.component.html',
  styleUrls: ['./define.component.scss']
})



export class DefineComponent implements AfterViewInit {
  @ViewChild('filepond', { static: false }) filepond!: ElementRef;

  public imageUrl: string | undefined;
  constructor(private http: HttpClient) {}
  ngAfterViewInit() {
    initFlowbite()

    const pondOptions = {
      allowReorder: true,
      maxFileSize: '5MB',
      maxFiles: 3
    };

    const pond = FilePond.create(this.filepond.nativeElement, pondOptions);
    pond.on('addfile', (error, file) => {
      if (error) {
        console.log('File Upload Error: ', error);
      } else {
        console.log('File Uploaded', file);
      }
    });
  }


  formData = { question: '', note: '', type: 'true'};

  submitForm(): void {
    const formData = new FormData();
    formData.append('question', this.formData.question);
    formData.append('note', this.formData.note);
    formData.append('type', this.formData.type);

    if (this.filepond.nativeElement.files.length > 0) {
      formData.append('file', this.filepond.nativeElement.files[0]);
    } else {
      console.log('No file selected');
    }
    console.log(formData);

    this.http.post('http://localhost:3000/submit/question', formData).subscribe((response) => {
      console.log(response);
      alert('Form submitted successfully');
    }, (error) => {
      console.error(error);
      alert('Failed to submit form');
    });
  }
}


