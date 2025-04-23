import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeRoleComponent } from './change-role/change-role.component';



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
export class UserModule { }
