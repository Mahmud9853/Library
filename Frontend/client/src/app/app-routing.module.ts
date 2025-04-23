import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ResetpasswordComponent } from './account/resetpassword/resetpassword.component';
import { BookListComponent } from './admin/book/book-list/book-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Client'] } },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Client'] }
  },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/resetpassword', component: ResetpasswordComponent },
  { path: '', redirectTo: 'account/login', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, // Admin modülü
  { path: 'dashboard', loadChildren: () => import('./admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: '**', redirectTo: '/home' }, 
    {
    path: '**',
    canActivate: [AuthGuard],
    component: HomeComponent, // Hatalı rotada giriş yapılmışsa Home'a, yapılmamışsa Login'e yönlendirme için AuthGuard kontrolü
  } // Geçersiz rotaları login veya home'e yönlendirme
  // { path: '**', redirectTo: 'home' } // Hatalı bir rota girilirse
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
