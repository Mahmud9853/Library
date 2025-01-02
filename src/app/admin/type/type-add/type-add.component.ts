import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { TypeService } from '../type.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-type-add',
  templateUrl: './type-add.component.html',
  styleUrls: ['./type-add.component.scss']
})
export class TypeAddComponent implements OnInit {
  type: any = {
    name:'',
  };
 
  role: string | null = null;
  constructor(private typeService: TypeService,  private router: Router, private accountService: AccountService){
    this.role = this.accountService.getRole();
  }
  ngOnInit(): void {
    
  }
  addType(): void{
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    const formData = new FormData();
    formData.append('name', this.type.name);
    this.typeService.addType(formData).subscribe({
      next:(response) => {
        console.log('Type added successfully:', response);
        this.router.navigate(['/admin/type/type-list']); // Başarılı ekleme sonrası yönlendirme
      },
      error: (err) => {
        console.error('Error adding type:', err);
      }
    })
  }

 

}
