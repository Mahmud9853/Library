import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  category: any = {
    id: 0,
    name:'',
  };
  
  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {

    const categoryId = this.route.snapshot.params['id'];
    if (categoryId) {
      this.loadCategory();
    }
  }
  loadCategory() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.categoryService.getCategoryById(id).subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          this.category = response;
        },
        error: (error) => {
          console.error('Error loading category details:', error);
        }
      });
    }
  }

  updateCategory() {
    const formData = new FormData();
    formData.append('name', this.category.name);
  
    this.categoryService.updateCategory(this.category.id, formData).subscribe({
      next: (response: any) => {
        console.log('Category updated successfully:', response);
        // Backend'den dönen güncellenmiş veriyi atayın
        this.category = response;
        this.router.navigate(['/admin/category/category-list']); // Başarılı güncelleme sonrası yönlendirme
      },
      error: (error) => {
        console.error('Error updating category:', error);
      }
    });
  }
}
