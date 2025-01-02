import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  homes: any[] =[];
  
   constructor(private fb: FormBuilder, private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.loadHomes();
  }
  loadHomes() {
    this.homeService.getHomes().subscribe({
      next: (response) =>{
        console.log("API Response home:", response);
        this.homes = response;
      },
      error: (error) => console.error('Error fetching books:', error)
    });
  }

}
