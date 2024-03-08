import { Component, OnInit, ViewChild, ElementRef,NgModule   } from '@angular/core';
import { Router, RouterLink, RouterLinkActive,ActivatedRoute } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';


import '@angular/platform-server/init';


import * as FilePond from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { registerPlugin } from 'filepond';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
FilePond.registerPlugin(FilePondPluginImageCrop);
FilePond.registerPlugin(FilePondPluginImagePreview);

@Component({
  selector: 'app-define',
  templateUrl: './define.component.html',
  styleUrls: ['./define.component.scss']
})



export class DefineComponent implements AfterViewInit {

  @ViewChild('filepond', { static: false }) filepond: any;

  @ViewChild('filepondedit', { static: false }) filepondedit: any;

  uploadedFile: File | null = null;

  public imageUrl: string | undefined;

  constructor(private http: HttpClient) { }

  formData = { question: '', note: '', type: 'true',id: ''};

  questions: any[] = [];

  pondFiles = [''];

  currentModal: string | null = null;

  ngOnInit(): void { this.fetchQuestion() }



  openModal(modalId: string): void {
    if (this.currentModal === null) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden');
        this.currentModal = modalId;
      }
    }
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      this.currentModal = null;
    }
  }

  fetchQuestionById(id: number): void {
    this.http.get<any>(`http://localhost:3000/fetch/question/${id}`).subscribe((response: any) => {
        this.fillEditModal(response);
    }, error => {
        console.error('Error fetching question:', error);
        alert('Error fetching question!');
    });
  }


  formEditData = { question_update: '', note_update: '', type_update: 'true', id: '' };

  fetchQuestion() {
    this.http.post('http://localhost:3000/fetch/questions', {}).subscribe((response: any) => {

      console.log('Questions response:', response);
    }, error => {
      console.error('Error fetch question:', error);
      alert('Error qetch question!');
    });
  }


  fillEditModal(response: any): void {
    // this.formEditData = response;
    console.log(response.path);

    // (<HTMLInputElement>document.getElementById('question-update')).value = response.question;
    // (<HTMLInputElement>document.getElementById('note-update')).value = response.note;
    // (<HTMLSelectElement>document.getElementById('type-update')).value = response.type;
    // (<HTMLSelectElement>document.getElementById('id')).value = response.id;

    if (response.path) {
      this.pondFiles = [response.path];
    }
  }

  pondHandleInit() {
    console.log('FilePond has initialised', this.filepondedit);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event.file.filename);
    this.uploadedFile = event.file.file;
  }

  ngAfterViewInit() {
      initFlowbite()

      const pondOptions = {
        allowReorder: true,
        maxFileSize: '5MB',
        maxFiles: 3
      };

      setTimeout(() => {
          const pond = FilePond.create(this.filepond.nativeElement, pondOptions);
          pond.on('addfile', (error, file) => {
              if (error) {
                  console.log('File Upload Error: ', error);
              } else {
                  console.log('File Uploaded', file);
                  this.uploadedFile = file.file;
              }
          });

          const pondEdit = FilePond.create(this.filepondedit.nativeElement, pondOptions);
          pondEdit.on('addfile', (error, file) => {
              if (error) {
                  console.log('File Upload Error: ', error);
              } else {
                  console.log('File Uploaded', file);
                  this.uploadedFile = file.file;
              }
          });
      }, 0);
  }

  submitForm(): void {
    const formData = new FormData();
    formData.append('question', this.formData.question);
    formData.append('note', this.formData.note);
    formData.append('type', this.formData.type);

    if (this.uploadedFile) {
      formData.append('file', this.uploadedFile);
    } else {
      console.log('No file selected');
      return;
    }
    this.http.post<any>('http://localhost:3000/submit/question', formData).subscribe((response) => {
      console.log(response);
      alert('Form submitted successfully');
      location.reload()
    }, (error) => {
      console.error(error);
      alert('Failed to submit form');
    });
  }

  submitFormUpdate(): void {
    const formData = new FormData();
    formData.append('question_update', this.formEditData.question_update);
    formData.append('note_update', this.formEditData.note_update);
    formData.append('type_update', this.formEditData.type_update);
    formData.append('id', this.formEditData.id);

    if (this.uploadedFile) {
      // formData.append('file', this.uploadedFile);
    } else {
      console.log('No file selected');
      return;
    }

    this.http.post<any>('http://localhost:3000/submit/question/update', formData).subscribe((response) => {
      console.log(response);
      alert('Form submitted successfully');
      location.reload()
    }, (error) => {
      console.error(error);
      alert('Failed to submit form');
    });
  }


}


