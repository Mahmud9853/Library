import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/models/book';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.scss']
})
export class BookDeleteComponent implements OnInit {
  book: any | null = null;
    constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
     this.getBook();
  }
  getBook() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.bookService.getBookById(id).subscribe({
       
        next: (response) => {
          console.log('API Response:', response); // Konsola yazdırın
          this.book = response;
        },
        error: (error) =>{
          console.error('Error loading book details:', error);
        }
      });
    }
  }
  DeleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.getBook();
    });
  }

}