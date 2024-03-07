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

@Component({
  selector: 'app-define',
  templateUrl: './define.component.html',
  styleUrls: ['./define.component.scss']
})



export class DefineComponent implements OnInit {

  @ViewChild('filepond', { static: false }) filepond!: ElementRef;

  ngOnInit() {
    initFlowbite();

    const pondOptions = {
      allowReorder: true,
      maxFileSize: '3MB',
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
}


