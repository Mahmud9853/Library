import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/models/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit{
  book: any | null = null;
  constructor(private bookService: BookService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.getBookDetail();
  }

  getBookDetail() : void {
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

}
