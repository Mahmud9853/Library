import { NgModule } from "@angular/core";
import { BookAddComponent } from "./book/book-add/book-add.component";
import { BookDeleteComponent } from "./book/book-delete/book-delete.component";
import { BookEditComponent } from "./book/book-edit/book-edit.component";
import { BookListComponent } from "./book/book-list/book-list.component";
import { BookDetailComponent } from "./book/book-detail/book-detail.component";
import { TypeDetailComponent } from "./type/type-detail/type-detail.component";
import { TypeEditComponent } from "./type/type-edit/type-edit.component";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TypeDeleteComponent } from "./type/type-delete/type-delete.component";
import { TypeAddComponent } from "./type/type-add/type-add.component";
import { TypeListComponent } from "./type/type-list/type-list.component";
import { AuthorListComponent } from "./author/author-list/author-list.component";
import { AuthorDetailComponent } from "./author/author-detail/author-detail.component";
import { ChangeRoleComponent } from "./user/change-role/change-role.component";
import { SlideListComponent } from "./slide/slide-list/slide-list.component";
import { SlideAddComponent } from "./slide/slide-add/slide-add.component";
import { SlideDetailComponent } from "./slide/slide-detail/slide-detail.component";
import { SlideEditComponent } from "./slide/slide-edit/slide-edit.component";
import { UserDeleteComponent } from "./user/user-delete/user-delete.component";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { UserAddComponent } from "./user/user-add/user-add.component";
import { AuthorDeleteComponent } from "./author/author-delete/author-delete.component";
import { AuthorAddComponent } from "./author/author-add/author-add.component";
import { CategoryListComponent } from "./category/category-list/category-list.component";
import { AuthorEditComponent } from "./author/author-edit/author-edit.component";
import { AdminComponent } from "./admin.component";
import { CategoryAddComponent } from "./category/category-add/category-add.component";
import { CategoryEditComponent } from "./category/category-edit/category-edit.component";
import { SupportComponent } from "./support/support.component";
import { HomeDetailComponent } from "./home/home-detail/home-detail.component";
import { HomeListComponent } from "./home/home-list/home-list.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { HomeAddComponent } from "./home/home-add/home-add.component";
import { HomeDeleteComponent } from "./home/home-delete/home-delete.component";
import { HomeEditComponent } from "./home/home-edit/home-edit.component";
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from "./course/course-list/course-list.component";
import { CourseAddComponent } from "./course/course-add/course-add.component";
import { CourseEditComponent } from "./course/course-edit/course-edit.component";




@NgModule({
  declarations: [
    BookListComponent,
    BookAddComponent,
    BookDeleteComponent,
    BookEditComponent,
    BookDetailComponent,
    TypeDetailComponent,
    TypeEditComponent,
    TypeDeleteComponent,
    TypeAddComponent,
    TypeListComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    AuthorDeleteComponent,
    AuthorEditComponent,
    AuthorAddComponent,
    AdminComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    SupportComponent,
    HomeListComponent,
    HomeAddComponent,
    HomeDetailComponent,
    HomeDeleteComponent,
    HomeEditComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserDeleteComponent,
    ChangeRoleComponent,
    SlideListComponent,
    SlideAddComponent,
    SlideEditComponent,
    SlideDetailComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseEditComponent,
    CourseComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule

  ],
    providers: [],
    bootstrap: [AdminComponent]
})
export class AdminModule { }
