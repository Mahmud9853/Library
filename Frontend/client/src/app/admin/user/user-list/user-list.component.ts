import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userDto: any[] = [];
  totalRecords = 0;
  role: string  | null = null;
  userToDelete: any = null;

  constructor(private fb: FormBuilder,private userService: UserService, private router: Router, private route: ActivatedRoute, private accountService: AccountService) {
    this.role = this.accountService.getRole();
  }
  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers(){
    this.userService.getUsers().subscribe( {
      next: (response) => {
        console.log("API Response All Users:", response);
        this.userDto = response;
        this.totalRecords = this.userDto.length;
      }
    });

  }

  openDeleteModal(user: any) {
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    this.userToDelete = user;
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modal = new (window as any).bootstrap.Modal(deleteModal); // 'window as any' ile tip belirtme
      modal.show();
    
    }
  }
  confirmDelete() {
    if (this.userToDelete) {
      if (this.role !== 'Admin') {
        console.error('Erişim reddedildi: Sadece Admin silebilir.');
        return;
      }
  
      // API çağrısı yapılır
      this.userService.deleteUser(this.userToDelete.id).subscribe({
        next: () => {
          // Silme işlemi başarılıysa, kullanıcının listeden çıkarılması
          this.userDto = this.userDto.filter((user) => user.id !== this.userToDelete.id);
  
          // Modalı kapat
          const deleteModal = document.getElementById('deleteModal');
          if (deleteModal) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(deleteModal);
            modalInstance?.hide(); // Modal'ı kapat
          }
  
          // Silinen kullanıcıyı null yapıyoruz
          this.userToDelete = null;
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }
  
  
  
 
}
