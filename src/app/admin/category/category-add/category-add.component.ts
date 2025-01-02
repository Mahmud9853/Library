import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  category: any = {
    name:'',
  };
  constructor(private categoryService: CategoryService,  private router: Router){}
  ngOnInit(): void {
    
  }
  addCategory(): void{
    const formData = new FormData();
    formData.append('name', this.category.name);
    this.categoryService.addCategory(formData).subscribe({
      next:(response) => {
        console.log('Category added successfully:', response);
        this.router.navigate(['/admin/category/category-list']); // Başarılı ekleme sonrası yönlendirme
      },
      error: (err) => {
        console.error('Error adding category:', err);
      }
    })
  }
}
