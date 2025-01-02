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

  menuItems = [
    { label: 'Kitablar', route: '/admin/book/book-list' ,   role: 'Admin'},
    { label: 'Tipləri', route: '/admin/type/type-list' ,   role: 'Admin'},
    { label: 'Müəllifləri', route: '/admin/author/author-list' ,   role: 'Admin' },
    { label: 'Kateqoriyası', route: '/admin/category/category-list',   role: 'Admin'},
    { label: 'Header parametrlər', route: '/admin/home/home-list', role: 'Client'},
    { label: 'İstifadəçilər', route: '/admin/user/user-list',  role: 'Admin'},
  ];
  username: string = '';
  constructor(public accountService: AccountService) {}
  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    const userRole = localStorage.getItem('role');
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
