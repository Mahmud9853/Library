import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authors: any[] = [];
  authorToDelete: any = null;
  role:string|null = null;

 constructor(private authorService: AuthorService, private router: Router, private accountService: AccountService) {
  this.role = this.accountService.getRole()
 }
  ngOnInit() {
   this.loadAuthor();
 }
 loadAuthor() {
  this.authorService.getAuthors().subscribe({
   next: (response: any) => {
      console.log('API Response:', response);
        this.authors = response;
    },
      error: error => console.log('Error fetching author:', error)
    })
  }


  openDeleteModal(author: any) {
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    this.authorToDelete = author;
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modal = new (window as any).bootstrap.Modal(deleteModal); // 'window as any' ile tip belirtme
      modal.show();
    }
  }
  confirmDelete() {
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    if (this.authorToDelete) {
      // API çağrısı yapılır
      this.authorService.deleteAuthor(this.authorToDelete.id).subscribe({
        next: (response: string) => {
          // Silme işleminden sonra kitap listesine ekleme
          console.log('Delete response:', response); // '4: Deleted.'
          this.authors = this.authors.filter((b) => b.id !== this.authorToDelete.id);
  
          // Modalı kapat
          const deleteModal = document.getElementById('deleteModal');
          if (deleteModal) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(deleteModal);
            modalInstance?.hide(); // Modal'ı kapat
          }
  
          // Kitaplar silindikten sonra yönlendirme yapılır
          this.router.navigate(['/admin/author/author-list']);
          this.authorToDelete = null;
        },
        error: (err) => {
          console.error('Error deleting type:', err);
        },
      });
    }
  }
}