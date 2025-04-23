import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppModule } from '../app.module';
import { HomeModule } from '../home/home.module';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HomeModule
    
  ]
})
export class AccountModule { }
