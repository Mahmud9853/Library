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

const routes: Routes = [
  {
    path: '', 
    component: AdminComponent, 
    children: [
      {path:'book/book-list', component:BookListComponent},
      {path:'type/type-list', component:TypeListComponent},
      {path:'type/type-detail/:id', component:TypeDetailComponent},
      {path:'author/author-list', component:AuthorListComponent},
      {path: 'book/book-detail/:id', component: BookDetailComponent },
      {path: 'book/book-edit/:id', component: BookEditComponent },
      {path: 'type/type-delete/:id', component: TypeDeleteComponent },
      {path: 'type/type-edit/:id', component: TypeEditComponent },
      {path: 'type/type-add', component: TypeAddComponent },
      {path: 'book/book-add', component: BookAddComponent },
      {path: 'author/author-add', component: AuthorAddComponent },
      {path: 'author/author-edit/:id', component: AuthorEditComponent },
      {path: 'book/book-delete/:id', component: BookDeleteComponent },
      {path: 'category/category-list', component:CategoryListComponent },
      {path: 'category/category-add', component:CategoryAddComponent },
      {path: 'category/category-edit/:id', component:CategoryEditComponent },
      {path: 'support', component:SupportComponent },
      {path: 'home/home-list', component:HomeListComponent },
      {path: 'home/home-detail/:id', component:HomeDetailComponent },
      {path: 'user/user-list', component:UserListComponent },
      {path: 'user/user-add', component:UserAddComponent },
      {path: 'user/user-edit/:id', component:UserEditComponent },
      {path: 'user/user-delete/:id', component:UserDeleteComponent },
      {path: 'user/change-role/:id', component:ChangeRoleComponent },
      // {path:  'book/book-list', loadChildren: () => import('./book/book.module').then(m => m.BookModule)},
      // {path: 'type/type-list', loadChildren: () => import('./type/type.module').then(m => m.TypeModule)},
      // {path: 'author/author-list', loadChildren: () => import ('./author/author/author.module').then(m => m.AuthorModule)},
      //users elve et
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: 'book', pathMatch: 'full' },
      {path: '', redirectTo: 'type', pathMatch: 'full'},
      {path: '', redirectTo: 'category', pathMatch: 'full'},
      {path: '', redirectTo: 'user', pathMatch: 'full'}
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
