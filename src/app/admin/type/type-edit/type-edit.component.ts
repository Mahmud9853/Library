import { Component, OnInit } from '@angular/core';
import { TypeService } from '../type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from 'src/app/shared/models/type';

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.scss']
})
export class TypeEditComponent implements OnInit {
  type: any = {
    id: 0,
    name:'',
  };
  
  constructor(private typeService: TypeService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {

    const typeId = this.route.snapshot.params['id'];
    if (typeId) {
      this.loadType();
    }
  }
  loadType() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.typeService.getTypeById(id).subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          this.type = response;
        },
        error: (error) => {
          console.error('Error loading type details:', error);
        }
      });
    }
  }

  updateType() {
    const formData = new FormData();
    formData.append('name', this.type.name);
  
    this.typeService.updateType(this.type.id, formData).subscribe({
      next: (response: any) => {
        console.log('Type updated successfully:', response);
        // Backend'den dönen güncellenmiş veriyi atayın
        this.type = response;
        this.router.navigate(['/admin/type/type-list']); // Başarılı güncelleme sonrası yönlendirme
      },
      error: (error) => {
        console.error('Error updating type:', error);
      }
    });
  }
}

