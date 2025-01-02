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
  book = {
    title: '',
    description: '',
    createBook: '',
    typeId: 0,
    categoryId: 0,
    authorId: 0,
    photoFile: null,
    documentFile: null
  };
  constructor(private bookService: BookService, private router: Router){}

  ngOnInit(): void {
    this.loadTypes();
    this.loadCategories();
    this.loadAuthors();
    this.addBook();
  }

    loadTypes() {
      this.bookService.getTypes().subscribe({
       next: (response: any) => {
          console.log('API Response type:', response);
            this.types = response;
        },
          error: error => console.log('Error fetching books:', error)
        })
    }
    loadAuthors() {
      this.bookService.getAuthors().subscribe({
       next: (response: any) => {
          console.log('API Response author:', response);
            this.authors = response;
        },
          error: error => console.log('Error fetching books:', error)
        })
    }
    loadCategories() {
      this.bookService.getCategories().subscribe({
        next: ( response : any) => {
          console.log('API Response category:', response);
          this.categories = response;
        },
        error: error=> console.log('Error fetching books:', error)
        
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
        }
      });
    }
    
}
