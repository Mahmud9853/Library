import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideListComponent } from './slide-list/slide-list.component';
import { SlideAddComponent } from './slide-add/slide-add.component';
import { SlideEditComponent } from './slide-edit/slide-edit.component';
import { SlideDetailComponent } from './slide-detail/slide-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SlideModule { }
