import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {
  author: any = {
    id: 0,
    name:'',
  };
  
  constructor(private authorService: AuthorService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {

    const authorId = this.route.snapshot.params['id'];
    if (authorId) {
      this.loadAuthor();
    }
  }
  loadAuthor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.authorService.getAuthorById(id).subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          this.author = response;
        },
        error: (error) => {
          console.error('Error loading type details:', error);
        }
      });
    }
  }

  updateAuthor() {
    const formData = new FormData();
    formData.append('fullName', this.author.fullName);
  
    this.authorService.updateAuthor(this.author.id, formData).subscribe({
      next: (response: any) => {
        console.log('Type updated successfully:', response);
        // Backend'den dönen güncellenmiş veriyi atayın
        this.author = response;
        this.router.navigate(['/admin/author/author-list']); // Başarılı güncelleme sonrası yönlendirme
      },
      error: (error) => {
        console.error('Error updating type:', error);
      }
    });
  }
}
