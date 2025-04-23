import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BookModule { }
