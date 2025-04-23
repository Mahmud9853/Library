import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/shared/models/type';
import { TypeService } from '../type.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent implements OnInit {
  types: any[] = [];
  typeToDelete: any = null;
  role: string  | null = null;
 constructor(private typeService: TypeService, private router: Router, private accountService: AccountService) {
  this.role = this.accountService.getRole();
 }
  ngOnInit() {
   this.loadType();
 }
 loadType() {
  this.typeService.getTypes().subscribe({
   next: (response: any) => {
      console.log('API Response:', response);
        this.types = response;
    },
      error: error => console.log('Error fetching books:', error)
    })
}

openDeleteModal(type: any) {
  if (this.role !== 'Admin') {
    alert('Erişim reddedildi: Sadece Admin silebilir.');
    return;
  }
  this.typeToDelete = type;
  const deleteModal = document.getElementById('deleteModal');
  if (deleteModal) {
    const modal = new (window as any).bootstrap.Modal(deleteModal); // 'window as any' ile tip belirtme
    modal.show();
  }
}
confirmDelete() {
  if (this.role !== 'Admin') {
    alert('Erişim reddedildi: Sadece Admin silebilir.');
    return;
  }
  if (this.typeToDelete) {
    // API çağrısı yapılır
    this.typeService.deleteType(this.typeToDelete.id).subscribe({
      next: (response: string) => {
        // Silme işleminden sonra kitap listesine ekleme
        console.log('Delete response:', response); // '4: Deleted.'
        this.types = this.types.filter((b) => b.id !== this.typeToDelete.id);

        // Modalı kapat
        const deleteModal = document.getElementById('deleteModal');
        if (deleteModal) {
          const modalInstance = (window as any).bootstrap.Modal.getInstance(deleteModal);
          modalInstance?.hide(); // Modal'ı kapat
        }

        // Kitaplar silindikten sonra yönlendirme yapılır
        this.router.navigate(['/admin/type/type-list']);
        this.typeToDelete = null;
      },
      error: (err) => {
        console.error('Error deleting type:', err);
      },
    });
  }
}


}
