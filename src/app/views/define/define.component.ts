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

  uploadedFile: File | null = null;

  public imageUrl: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { this.fetchQuestion() }

  questions: any[] = [];

  fetchQuestion() {
    this.http.post('http://localhost:3000/fetch/questions', {}).subscribe((response: any) => {
      console.log('Questions response:', response);
      this.questions = response;
    }, error => {
      console.error('Error fetch question:', error);
      alert('Error qetch question!');
    });
  }

  currentModal: string | null = null;

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
      this.formData = response;
      this.openModal('edit-modal');
    }, error => {
      console.error('Error fetching question:', error);
      alert('Error fetching question!');
    });
  }


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
        this.uploadedFile = file.file;
      }
    });

  }

  formData = { question: '', note: '', type: 'true' };

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
    }, (error) => {
      console.error(error);
      alert('Failed to submit form');
    });
  }

}


