import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  role: string | null = null;
  username: string = '';
  filteredMenuItems: any[] = [];
  menuItems = [
    { label: 'Kitablar', route: '/admin/book/book-list' , role: ['Admin', 'Client']},
    { label: 'Tipləri', route: '/admin/type/type-list' ,   role: ['Admin']},
    { label: 'Müəllifləri', route: '/admin/author/author-list' ,   role: ['Admin']},
    { label: 'Kateqoriyası', route: '/admin/category/category-list',   role: ['Admin']},
    { label: 'Header parametrlər', route: '/admin/home/home-list', role: ['Admin']},
    { label: 'Slayd parametrlər', route: '/admin/slide/slide-list', role: ['Admin']},
    { label: 'Kurslar', route: '/admin/course/course-list', role: ['Admin']},
    { label: 'İstifadəçilər', route: '/admin/user/user-list',  role: ['Admin']},
  ];

  constructor(public accountService: AccountService) 
  {
    this.role = this.accountService.getRole();
  }
  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    const userRole = localStorage.getItem('role');
    this.filteredMenuItems = this.menuItems.filter((item) => item.role.includes(this.role || 'Guest'));
    if (storedUsername) {
      this.username = storedUsername; // Eğer localStorage'da varsa, kullanıcı adı atanıyor
    } else {
      this.username = 'Guest'; // Eğer yoksa, 'Guest' atanıyor
    }
  }

  logout() {
    this.accountService.logout();
  }
}
