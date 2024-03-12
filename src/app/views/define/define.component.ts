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
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Injectable } from '@angular/core';
import { log } from 'console';
import { exit } from 'process';

import * as FilePond from 'filepond';
import { registerPlugin } from 'filepond';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
FilePond.registerPlugin(FilePondPluginImageCrop);
FilePond.registerPlugin(FilePondPluginImageValidateSize);
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

  updatedFile: File | null = null;

  public imageUrl: string | undefined;

  questions: any[] = [];

  allQuestions: any[] = [];

  currentPage: number = 1;

  itemsPerPage: number = 4;

  pondFiles = [''];

  currentModal: string | null = null;

  formData = { question: null, note: null, type: 'true' };

  formDataUpdate = { question: '', note: '', type: '' ,id: ''};

  isModalOpen: boolean = false;

  selectedIds: number[] = [];

  public pondOptions: any;

  submitted: boolean = false;

  // id: any;

  constructor( private http: HttpClient) { }

  ngAfterViewInit() {
    initFlowbite();

    const pondOptions = {
      allowReorder: false,
      maxFileSize: '5MB',
      acceptedFileTypes: 'image/png',
      allowMultiple: false,

    };

    setTimeout(() => {
      const pond = FilePond.create(this.filepond.nativeElement, this.pondOptions);
      pond.on('addfile' , (error, file) => {
        if (error) {
          console.log('File has pick Error: ', error);
        } else {
          console.log('File has picked', file);
          this.uploadedFile = file.file;
        }
      });
    }, 0);
  }

  ngOnInit(): void {
    initFlowbite();

    this.fetchQuestions(1, this.itemsPerPage);
    this.fetchAllQuestions();
  }

  range(start: number, end: number): number[] {
    return Array.from({length: end - start + 1}, (_, index) => index + start);
  }

  fetchQuestions(page: number, limit: number) {
    this.http.post('http://localhost:3000/fetch/questions', { start: (page - 1) * limit + 1, end: page * limit }).subscribe((response: any) => {
      console.log(response);
      this.questions = response.questions;

    }, error => {
      console.error('Error fetching questions:', error);
      alert('Error fetching questions!');
    });
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.fetchQuestions(this.currentPage, this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchQuestions(this.currentPage, this.itemsPerPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchQuestions(this.currentPage, this.itemsPerPage);
    }
  }

  fetchAllQuestions() {
    this.http.get('http://localhost:3000/fetch/all/questions').subscribe((response: any) => {
      this.allQuestions = response;
      this.fetchQuestions(this.currentPage, this.itemsPerPage);
    }, error => {
      console.error('Error fetch all questions:', error);
      alert('Error fetch all questions!');
    });
  }

  get currentPageQuestions(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.allQuestions.length - 1);
    return this.allQuestions.slice(startIndex, endIndex + 1);
  }

  get currentIndexRange(): { start: number, last: number } {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const last = Math.min(start + this.itemsPerPage - 1, this.allQuestions.length);
    return { start, last };
  }

  get totalPages(): number {
    return Math.ceil(this.allQuestions.length / this.itemsPerPage);
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      this.isModalOpen = true;
      document.body.classList.add('overflow-hidden');
    }
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      document.body.classList.remove('overflow-hidden');
      modal.classList.add('hidden');
      this.isModalOpen = false;

      const pondElement = modal.querySelector('#findpondedit');
      if (pondElement) {
        const pond = FilePond.find(pondElement);
        if (pond) {
          pond.destroy();
          console.log('File has removed',pond);

        }
      }
    }
  }

  fetchQuestionById(id: number): void {
    this.http.get<any>(`http://localhost:3000/fetch/question/${id}`).subscribe((response: any) => {
      this.fillEditModal(response);
      console.log('fetch question by id',response);

    }, error => {
        console.error('Error fetching question:', error);
        alert('Error fetching question!');
    });
  }


  fillEditModal(response: any): void {
    console.log(response.path);
    this.formDataUpdate = {
      id: response.id,
      question: response.question,
      note: response.note,
      type: response.type
    };
    this.pondOptions = {
      allowReorder: true,
      maxFileSize: '5MB',
      allowRevert: false
    };

    const pondEdit = FilePond.create(this.filepondedit.nativeElement,this.pondOptions);
    if (response.path) {
      this.openModal('edit-modal');
      pondEdit.on(('addfile'), (error, file) => {
        if (error) {
          console.log('File has pick Error: ', error);
        } else {
          console.log('File has picked', file);
          this.updatedFile = file.file as File;

        }
      });
        pondEdit.addFile(response.path).then((fileupdate) => {
        console.log('File has pick  ', fileupdate);
        this.updatedFile = fileupdate.file as File;

      }).catch((error) => {
        console.error('File Add Error:', error);
      });

    }
    if (!response.path) {
      pondEdit.on(('addfile'), (error, file) => {
        if (error) {
          console.log('File has pick Error: ', error);
        } else {
          console.log('File has picked', file);
          this.updatedFile = file.file as File;
        }
      });
      this.openModal('edit-modal');
    }
  }

  pondHandleInit() {
    console.log('FilePond has initialised', this.filepond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event.file.filename);
  }


  submitForm(): void {

    if (!this.formData.question || !this.formData.note || !this.formData.type) {
      alert('Please fill in all fields and select a file');
      return;
    }

    const formData = new FormData();
    formData.append('question', this.formData.question);
    formData.append('note', this.formData.note);
    formData.append('type', this.formData.type);

    if (this.uploadedFile) {
      formData.append('file', this.uploadedFile);
    }
    // else {
    //   console.log('No file selected');
    //   return;
    // }
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

    if (!this.formDataUpdate.question || !this.formDataUpdate.note || !this.formDataUpdate.type ) {
      alert('Please fill in all fields and select a file');
      return;
    }


    const formDataUpdate = new FormData();
    formDataUpdate.append('question_update', this.formDataUpdate.question);
    formDataUpdate.append('note_update', this.formDataUpdate.note);
    formDataUpdate.append('type_update', this.formDataUpdate.type);
    formDataUpdate.append('id', this.formDataUpdate.id);

    if (this.updatedFile) {
      formDataUpdate.append('file-update', this.updatedFile);
    }
    // else {
      // console.log('No file selected');
      // return;
    // }

    console.log('Form data EDIT:', this.formDataUpdate);
    console.log('File data EDIT:', this.updatedFile);
    // return

    this.http.post<any>('http://localhost:3000/submit/question/update', formDataUpdate).subscribe((response) => {
      console.log(response);
      alert('Form updated successfully');
      location.reload()
    }, (error) => {
      console.error(error);
      alert('Failed to submit form');
    });
  }

  deleteQuestion(questionId: number): void {
    this.http.post('http://localhost:3000/question/delete', { questionId }).subscribe(
      (response) => {
        console.log(response);
        alert('Question deleted successfully');
        location.reload();
      },
      (error) => {
        console.error(error);
        alert('Failed to delete question');
      }
    );
  }

  checkAll(): void {
    const allChecked = this.questions.every(question => question.checked);
    this.questions.forEach(question => question.checked = !allChecked);
  }

  uncheckAll(): void {
    this.questions.forEach(question => question.checked = false);
  }

  deleteMultiple(): void {
    this.selectedIds = this.questions.filter(question => question.checked).map(question => question.id);
    if (this.selectedIds.length === 0) {
      alert('Please select at least one item');
      return;
    }

    console.log(this.selectedIds);

    this.http.post<any>('http://localhost:3000/submit/question/multiple', { selectedIds: this.selectedIds }).subscribe((response) => {
      console.log(response);
      alert('Items selected deleted successfully');
      location.reload();
    }, (error) => {
      console.error(error);
      alert('Failed to delete selected items');
    });
  }
}



