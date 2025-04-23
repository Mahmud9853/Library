import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { HomeComponent } from './home/home/home.component';
import { HomeModule } from './home/home.module';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryModule } from './admin/category/category.module';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ResetpasswordComponent } from './account/resetpassword/resetpassword.component';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AdminModule,
    HomeModule,
    DashboardModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    CategoryModule,
    FormsModule,
    AccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
