import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AdminModule } from '../admin/admin.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
    
    
  ],
  exports:[
  ]
})
export class HomeModule { }
