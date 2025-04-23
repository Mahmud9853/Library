import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { AdminComponent } from './admin.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { TypeListComponent } from './type/type-list/type-list.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BookDeleteComponent } from './book/book-delete/book-delete.component';
import { TypeDetailComponent } from './type/type-detail/type-detail.component';
import { BookAddComponent } from './book/book-add/book-add.component';
import { TypeDeleteComponent } from './type/type-delete/type-delete.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { TypeEditComponent } from './type/type-edit/type-edit.component';
import { TypeAddComponent } from './type/type-add/type-add.component';
import { AuthorAddComponent } from './author/author-add/author-add.component';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { SupportComponent } from './support/support.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { HomeDetailComponent } from './home/home-detail/home-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { ChangeRoleComponent } from './user/change-role/change-role.component';
import { HomeAddComponent } from './home/home-add/home-add.component';
import { HomeEditComponent } from './home/home-edit/home-edit.component';
import { SlideListComponent } from './slide/slide-list/slide-list.component';
import { SlideAddComponent } from './slide/slide-add/slide-add.component';
import { SlideDetailComponent } from './slide/slide-detail/slide-detail.component';
import { SlideEditComponent } from './slide/slide-edit/slide-edit.component';
import { CourseComponent } from './course/course.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseAddComponent } from './course/course-add/course-add.component';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  {
    path: '', 
    component: AdminComponent, 
    children: [
      {path:'book/book-list', component:BookListComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Client']}},
      {path:'type/type-list', component:TypeListComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
      {path:'type/type-detail/:id', component:TypeDetailComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
      {path:'author/author-list', component:AuthorListComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
      {path: 'book/book-detail/:id', component: BookDetailComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
      {path: 'book/book-edit/:id', component: BookEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'type/type-delete/:id', component: TypeDeleteComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'type/type-edit/:id', component: TypeEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'type/type-add', component: TypeAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'book/book-add', component: BookAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'author/author-add', component: AuthorAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'author/author-edit/:id', component: AuthorEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'book/book-delete/:id', component: BookDeleteComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'category/category-list', component:CategoryListComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'category/category-add', component:CategoryAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'category/category-edit/:id', component:CategoryEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'support', component:SupportComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Client']} },
      {path: 'home/home-list', component:HomeListComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'home/home-detail/:id', component:HomeDetailComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'home/home-add', component:HomeAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'home/home-edit/:id', component:HomeEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'user/user-list', component:UserListComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'user/user-add', component:UserAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'user/user-edit/:id', component:UserEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
      {path: 'user/user-delete/:id', component:UserDeleteComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'user/change-role/:id', component:ChangeRoleComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'slide/slide-list', component:SlideListComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'slide/slide-add', component:SlideAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'slide/slide-detail/:id', component:SlideDetailComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'slide/slide-edit/:id', component:SlideEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'course/course-edit/:id', component:CourseEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'course/course-list', component:CourseListComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'course/course-add', component:CourseAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
      {path: 'course', component:CourseComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Client']}},
       // {path:  'book/book-list', loadChildren: () => import('./book/book.module').then(m => m.BookModule)},
      // {path: 'type/type-list', loadChildren: () => import('./type/type.module').then(m => m.TypeModule)},
      // {path: 'author/author-list', loadChildren: () => import ('./author/author/author.module').then(m => m.AuthorModule)},
      //users elve et
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: 'book', pathMatch: 'full' },
      {path: '', redirectTo: 'type', pathMatch: 'full'},
      {path: '', redirectTo: 'category', pathMatch: 'full'},
      {path: '', redirectTo: 'user', pathMatch: 'full'},
      {path: '', redirectTo: 'slide', pathMatch: 'full'},
      {path: '', redirectTo: 'course', pathMatch: 'full'},
    
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
