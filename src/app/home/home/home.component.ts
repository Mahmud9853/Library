import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 role: string  | null = null;

  constructor(  private router: Router, private route:ActivatedRoute, private accountService: AccountService) {
    this.role = this.accountService.getRole();
  }
}
