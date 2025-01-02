import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book/book.service';
import { TypeService } from '../../type/type.service';
import { CategoryService } from '../../category/category.service';
import { AuthorService } from '../../author/author.service';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // role: string = 'Admin';  
  role:string | null = null;
  menuItems = [
    { label: 'Kitablar', route: '/admin/book/book-list' ,   role: 'Client'},
    { label: 'Tipləri', route: '/admin/type/type-list' ,  role: 'Client'},
    { label: 'Müəllifləri', route: '/admin/author/author-list' ,   role: 'Client' },
    { label: 'Kateqoriyası', route: '/admin/category/category-list', role: 'Client'},
    { label: 'Header parametrlər', route: '/admin/home/home-list',  role: 'Admin'},
    { label: 'İstifadəçilər', route: '/admin/user/user-list',  role: 'Admin'},
  ];
  books: any[] = [];
  types: any[] = [];
  categories: any[] = [];
  authors: any[] = [];
  totalRecordsBook = 0;
  totalRecordsType = 0;
  totalRecordsAuthors = 0;
  totalRecordsCategories= 0;

username: string = '';
  constructor( private bookService: BookService,private accountService: AccountService, private typeService: TypeService, private categoryService: CategoryService,private authorService: AuthorService) {
    this.role = this.accountService.getRole();
  }

  ngOnInit(): void {
    this.getBooks();
    this.getTypes();
    this.getAuthors();
    this.getCategories();
    const storedUsername = localStorage.getItem('username');
    const userRole = localStorage.getItem('role');
    if (storedUsername) {
      this.username = storedUsername; // Eğer localStorage'da varsa, kullanıcı adı atanıyor
    } else {
      this.username = 'Guest'; // Eğer yoksa, 'Guest' atanıyor
    }
  }

 getBooks(): void { 
      this.bookService.getBooks().subscribe({
       next: (response: any) => {
          console.log('API Response:', response);
            this.books = response;
            this.totalRecordsBook = this.books.length;
        },
          error: error => console.log('Error fetching books:', error)
        })
  }
  getTypes(): void { 
    this.typeService.getTypes().subscribe({
     next: (response: any) => {
        console.log('API Response:', response);
          this.types = response;
          this.totalRecordsType = this.types.length;
      },
        error: error => console.log('Error fetching types:', error)
      })
  }
  getAuthors(): void { 
    this.authorService.getAuthors().subscribe({
     next: (response: any) => {
        console.log('API Response:', response);
          this.authors = response;
          this.totalRecordsAuthors = this.authors.length;
      },
        error: error => console.log('Error fetching types:', error)
      })
  }
  getCategories(): void { 
    this.categoryService.getCategories().subscribe({
     next: (response: any) => {
        console.log('API Response:', response);
          this.categories = response;
          this.totalRecordsCategories = this.categories.length;
      },
        error: error => console.log('Error fetching categories:', error)
      })
  }

  logout() {
    this.accountService.logout();
  }

}
