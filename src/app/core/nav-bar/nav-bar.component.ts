import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser: any;
  role: string | null = null;
  constructor(public accountService: AccountService, private router: Router) {}
  
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.role = this.accountService.getRole(); // Role güncelleniyor
      console.log('Current User:', this.currentUser);  // Kullanıcı verisi
      console.log('Role:', this.role);  // Role değeri
    });
  }
  
}
