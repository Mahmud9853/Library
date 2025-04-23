import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { TypeService } from '../../type/type.service';
import { AuthorService } from '../../author/author.service';
import { Book } from 'src/app/shared/models/book';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit{
  types: any[] = [];
  categories: any[] = [];
  authors: any[] = [];
  courses: any[] = [];
  book = {
    title: '',
    description: '',
    createBook: '',
    typeId: 0,
    categoryId: 0,
    authorId: 0,
    courseId: 0,
    photoFile: null,
    documentFile: null
  };
  constructor(private bookService: BookService, private router: Router){}

  ngOnInit(): void {
    this.loadTypes();
    this.loadCategories();
    this.loadAuthors();
    this.loadCourses();
    this.addBook();
  }

    loadTypes() {
      this.bookService.getTypes().subscribe({
       next: (response: any) => {
          console.log('API Response type:', response);
            this.types = response;
        },
          error: error => console.log('Error fetching Types:', error)
        })
    }
    loadAuthors() {
      this.bookService.getAuthors().subscribe({
       next: (response: any) => {
          console.log('API Response author:', response);
            this.authors = response;
        },
          error: error => console.log('Error fetching Authors:', error)
        })
    }
    loadCategories() {
      this.bookService.getCategories().subscribe({
        next: ( response : any) => {
          console.log('API Response category:', response);
          this.categories = response;
        },
        error: error=> console.log('Error fetching Categories:', error)
        
      })
    }
    loadCourses(){
      this.bookService.getCourses().subscribe({
        next: (response: any) => {
          console.log('API Response courses:', response);
          this.courses = response;
        },
        error: error=> console.log('Error fetching Courses:', error)
      })
    }

    onFileChange(event: any, fileType: 'photo' | 'document') {
      const file = event.target.files[0];
      if (fileType === 'photo') {
        this.book.photoFile = file;
      } else if (fileType === 'document') {
        this.book.documentFile = file;
      }
    }
  
    addBook() {
      const formData = new FormData();
      formData.append('Title', this.book.title);
      formData.append('Description', this.book.description);
      formData.append('CreateBook', this.book.createBook);
      formData.append('TypeId', this.book.typeId.toString());
      formData.append('CategoryId', this.book.categoryId.toString());
      formData.append('AuthorId', this.book.authorId.toString());
      // CourseId yalnızca geçerli bir değer varsa ekleniyor
      if (this.book.courseId && this.book.courseId > 0) {
        formData.append('CourseId', this.book.courseId.toString());
      }
      if (this.book.photoFile) {
        formData.append('PhotoFile', this.book.photoFile);
      }
      if (this.book.documentFile) {
        formData.append('DocumentFile', this.book.documentFile);
      }
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      this.bookService.addBook(formData, headers).subscribe({
        next: (response) => {
          console.log('Book added successfully:', response);
          this.router.navigate(['/admin/book/book-list']);
        },
        error: (err) => {
          console.error('Error adding book:', err);
          
          if (err.error && err.error.includes('Eyni adlı kitab artıq mövcuddur')) {
            alert('Bu adda kitab artıq mövcuddur. Fərqli başlıq seçin.');
          }else if(err.error && err.error.includes('Invalid photo type. Only PNG, JPG, and GIF are allowed.')) {
            alert('Foto yerinə Sənəd faylı seçilə bilməz.');
          }else if(err.error && err.error.includes('Invalid document type. Only PDF are allowed.')) {
            alert('Sənəd yerinə Foto faylı seçilə bilməz.');
          } else {
            alert('Kitabı əlavə edərkən gözlənilməz xəta baş verdi.');
          }
        }
      });
    }
    
}
