import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Book} from 'src/app/shared/models/book'; 
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookParams } from 'src/app/shared/models/bookParams';
import { TypeService } from '../../type/type.service';
import { AuthorService } from '../../author/author.service';
import { Author } from 'src/app/shared/models/author';
import { Category } from 'src/app/shared/models/category';
import { Type } from 'src/app/shared/models/type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { identifierName } from '@angular/compiler';
import { AccountService } from 'src/app/account/account.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit{
  Math = Math;
  bookToDelete: any = null;
  searchForm!: FormGroup;
  books: any[] = [];
  book: any;
  totalRecords = 0;
  categories: Category[] = [];
  types: any[] = [];
  authors: any[] = [];
  totalPages: number = 0; // Toplam sayfa sayısı
  visiblePages: number[] = []; // Görünen sayfa numaraları
  role: string  | null = null;

  bookParams: BookParams = new BookParams();
  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router, private route:ActivatedRoute, private accountService: AccountService) {
    this.role = this.accountService.getRole();
  }
  
 ngOnInit(): void {
    // this.getBooks();
    // this.loadType();
    // this.loadAuthor();
    this.route.queryParams.subscribe(params => {
      const courseId = params['courseId'];
      if (courseId) {
          // bookParams-ə əlavə edirik ki, backend filtrləşdirməni kurs əsasında etsin
          this.bookParams.courseId = +courseId;
          console.log('CourseId from URL:', this.bookParams.courseId);
      }
      this.getBookParams();
    })
    this.loadFilters();

    this.searchForm = this.fb.group({
      search: [''],
      typeId: [''],
      authorId: [''],
      categoryId: [''],
    });

    // Dinamik olarak form değişikliklerini takip etmek
    this.searchForm.valueChanges.subscribe((values) => {
      this.applyFilters();
    });
  
  }
 
  getBookParams(): void {
    console.log("Fetching books with params:", this.bookParams);  // Debugging log
    this.bookService.getBookss(this.bookParams).subscribe({
      next: (response: any) => {
       
        this.books = response.books || [];
        this.totalRecords = response.totalRecords || 0;
        this.totalPages = Math.ceil(this.totalRecords / this.bookParams.pageSize);
        this.updateVisiblePages();  // Sayfa numaralarını güncelle
        
        console.log('Current Page:', this.bookParams.pageNumber);
        console.log('Books:', this.books);
      },
      error: (error) => console.error('Error fetching books:', error),
    });
  }
  
  loadFilters(): void {
    console.log('API Response types:', this.types );
    this.bookService.getTypes().subscribe((types) => (this.types = types));
    console.log('API Response authors:', this.authors  );
    this.bookService.getAuthors().subscribe((authors) => (this.authors = authors));
    console.log('API Response categories:', this.categories  );
    this.bookService.getCategories().subscribe((categories) => (this.categories = categories));
  }
  onSearch(): void{
    console.log(this.searchForm)
    this.bookParams.search = this.searchForm.value.search;
    this.getBookParams();
  }
  updateVisiblePages(): void {
    const maxVisible = 5; // Maksimum görünecek sayfa düğmesi
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(this.bookParams.pageNumber - half, 1);
    let end = Math.min(start + maxVisible - 1, this.totalPages);
  
    if (end - start + 1 < maxVisible) {
      start = Math.max(end - maxVisible + 1, 1);
    }
    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  onPageChange(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this.bookParams.pageNumber = pageNumber;
      this.getBookParams();  // Yeni sayfa verisini al
    }
  }
  applyFilters(): void {
    const { search, typeId, authorId, categoryId } = this.searchForm.value;
    this.bookParams = { ...this.bookParams, search, typeId, authorId, categoryId };
    // Filtre uygulama mantığı
    console.log('Filters:', { search, typeId, authorId, categoryId});
    this.getBookParams(); // API'yi çağırabilirsiniz.
  }
  openDeleteModal(book: any) {
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    this.bookToDelete = book;
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modal = new (window as any).bootstrap.Modal(deleteModal); // 'window as any' ile tip belirtme
      modal.show();
    
    }
  }
  confirmDelete() {
    if (this.bookToDelete) {
      if (this.role !== 'Admin') {
        console.error('Erişim reddedildi: Sadece Admin silebilir.');
        return;
      }
      // API çağrısı yapılır
      this.bookService.deleteBook(this.bookToDelete.id).subscribe({
        next: (response: string) => {
          // Silme işleminden sonra kitap listesine ekleme
          console.log('Delete response:', response); // '4: Deleted.'
          this.books = this.books.filter((b) => b.id !== this.bookToDelete.id);
  
          // Modalı kapat
          const deleteModal = document.getElementById('deleteModal');
          if (deleteModal) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(deleteModal);
            modalInstance?.hide(); // Modal'ı kapat
          }
  
          // Kitaplar silindikten sonra yönlendirme yapılır
          this.router.navigate(['/admin/book/book-list']);
          this.bookToDelete = null;
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        },
      });
    }
  }
  
  downloadBook(id: number, bookTitle: string) {
    this.bookService.downloadBook(id).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${bookTitle}.pdf`; // Dinamik olarak kitap adını kullanabilirsiniz
        link.click();
      },
      (error) => {
        console.error('Error downloading book', error);
      }
    );
  }
  
  

  


  // getBookParams() : void {
  //   this.bookService.getBookss(this.bookParams).subscribe({
  //     next: (response: any) => {
  //       console.log('API Response books:', response);
  //       this.books = response.books || [];
  //       this.totalRecords = response.totalRecords || 0;
  //     },
  //     error: (error) => console.log('Error fetching books:', error),
  //   });
  // }
    // getBooks(): void { 
    //   this.bookService.getBooks().subscribe({
    //    next: (response: any) => {
    //       console.log('API Response:', response);
    //         this.books = response;
    //     },
    //       error: error => console.log('Error fetching books:', error)
    //     })
    // }
    // loadType() {
    //   this.bookService.getTypes().subscribe({
    //    next: (response: any) => {
    //       console.log('API Response type:', response);
    //         this.types = response;
    //     },
    //       error: error => console.log('Error fetching books:', error)
    //     })
    // }
    // loadAuthor() {
    //   this.bookService.getAuthors().subscribe({
    //    next: (response: any) => {
    //       console.log('API Response author:', response);
    //         this.authors = response;
    //     },
    //       error: error => console.log('Error fetching books:', error)
    //     })
    // }
  }

