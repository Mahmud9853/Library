import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  homes: any[] =[];
  home: any;
  homeToDelete: any = null;
  role: string | null = null;
   constructor(private fb: FormBuilder, private homeService: HomeService, private router: Router, private accountService: AccountService) {
    this.role = this.accountService.getRole();
   }

  
  ngOnInit(): void {
    this.loadHomes();
  }
  loadHomes() {
    this.homeService.getHomes().subscribe({
      next: (response) =>{
        console.log("API Response home:", response);
        this.homes = response;
      },
      error: (error) => console.error('Error fetching books:', error)
    });
  }

  openDeleteModal(home: any) {
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    this.homeToDelete = home;
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modal = new (window as any).bootstrap.Modal(deleteModal); // 'window as any' ile tip belirtme
      modal.show();
    
    }
  }
  confirmDelete() {
    if (this.homeToDelete) {
      if (this.role !== 'Admin') {
        console.error('Erişim reddedildi: Sadece Admin silebilir.');
        return;
      }
      // API çağrısı yapılır
      this.homeService.deleteHome(this.homeToDelete.id).subscribe({
        next: (response: string) => {
          // Silme işleminden sonra kitap listesine ekleme
          console.log('Delete response:', response); // '4: Deleted.'
          this.homes = this.homes.filter((b) => b.id !== this.homeToDelete.id);
  
          // Modalı kapat
          const deleteModal = document.getElementById('deleteModal');
          if (deleteModal) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(deleteModal);
            modalInstance?.hide(); // Modal'ı kapat
          }
  
          // Kitaplar silindikten sonra yönlendirme yapılır
          this.router.navigate(['/admin/home/home-list']);
          this.homeToDelete = null;
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        },
      });
    }
  }

}
