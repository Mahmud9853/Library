import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent  implements OnInit {
  categories: any[] = [];
  categoryToDelete: any = null;
  role: string | null = null;
 constructor(private categoryService: CategoryService, private router: Router, private accountService: AccountService) { 
   this.role = this.accountService.getRole()

 }

  ngOnInit() {
   this.loadCategory();
 }
 loadCategory() {
  this.categoryService.getCategories().subscribe({
   next: (response: any) => {
      console.log('API Response:', response);
        this.categories = response;
    },
      error: error => console.log('Error fetching categories:', error)
    })
  }
  openDeleteModal(category: any) {
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    this.categoryToDelete = category;
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
    if (this.categoryToDelete) {
      // API çağrısı yapılır
      this.categoryService.deleteCategory(this.categoryToDelete.id).subscribe({
        next: (response: string) => {
          // Silme işleminden sonra kitap listesine ekleme
          console.log('Delete response:', response); // '4: Deleted.'
          this.categories = this.categories.filter((b) => b.id !== this.categoryToDelete.id);
  
          // Modalı kapat
          const deleteModal = document.getElementById('deleteModal');
          if (deleteModal) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(deleteModal);
            modalInstance?.hide(); // Modal'ı kapat
          }
  
          // Kitaplar silindikten sonra yönlendirme yapılır
          this.router.navigate(['/admin/category/category-list']);
          this.categoryToDelete = null;
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        },
      });
    }
  }


}
