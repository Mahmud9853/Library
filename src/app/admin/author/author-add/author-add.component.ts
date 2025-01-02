import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.scss']
})
export class AuthorAddComponent implements OnInit {
 author: any = {
    fullName:'',
  };
  constructor(private authorService: AuthorService,  private router: Router){}
  ngOnInit(): void {
    
  }
  addAuthor(): void{
    const formData = new FormData();
    formData.append('fullName', this.author.fullName);
    this.authorService.addAuthor(formData).subscribe({
      next:(response) => {
        console.log('Author added successfully:', response);
        this.router.navigate(['/admin/author/author-list']); // Başarılı ekleme sonrası yönlendirme
      },
      error: (err) => {
        console.error('Error adding type:', err);
      }
    })
  }
}
