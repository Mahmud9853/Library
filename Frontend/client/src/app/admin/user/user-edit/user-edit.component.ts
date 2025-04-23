import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: any = {
    id: '',
    email: '',
    userName: '',
    name: '',
    surname:'',
    birthDate: ''
  };
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    
    const userId = this.route.snapshot.params['id'];
    this.loadUser(userId);
    // Burada kullanıcı detaylarını API'den çekebilirsiniz
  }
  loadUser(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        console.log('User loaded successfully:', response);
        this.user = response;
        if (this.user.birthDate) {
          this.user.birthDate = this.user.birthDate.split('T')[0];
        }
      },
      error: (error) => {
        console.error('Error loading user:', error);
      },
    });
  }
  updateUser(): void {
    const userId = this.route.snapshot.params['id']; 
    const formData = new FormData();
    formData.append('userName', this.user.userName);  // Kullanıcı adı
    formData.append('email', this.user.email);        // Email
    formData.append('name', this.user.name);          // Ad
    formData.append('surname', this.user.surname);    // Soyad
    const formattedDate = new Date(this.user.birthDate).toISOString().split('T')[0]; // Doğum tarihini yyyy-MM-dd formatına çeviriyoruz
    formData.append('birthDate', formattedDate); // Doğum tarihi
    this.userService.updateUser(userId, formData).subscribe({
      next: (response) => {
        console.log('Kullanıcı başarıyla güncellendi:', response);
        this.router.navigate(['admin/user/user-list']); // Kullanıcı listesine yönlendirme
      },
      error: (error) => {
        console.error('Kullanıcı güncellenirken hata oluştu:', error);
      },
    });
  
  }
}
