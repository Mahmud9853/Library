import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeAddComponent } from './home-add/home-add.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { HomeDeleteComponent } from './home-delete/home-delete.component';
import { HomeEditComponent } from './home-edit/home-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
