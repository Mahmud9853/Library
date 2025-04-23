import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { HomeService } from 'src/app/admin/home/home.service';
import { SlideService } from 'src/app/admin/slide/slide.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  slides: any[] = [];
  slide: any;
 role: string  | null = null;
 home: any;
 homePhotos: any[] = [];
 groupedSlides: any[] = [];
  constructor(private router: Router, private route:ActivatedRoute, private accountService: AccountService, private homeService: HomeService, private slideService: SlideService) {
    this.role = this.accountService.getRole();
  }
  ngOnInit(): void {
    this.loadDefaultHome();
    this.loadSlides();
    this.groupSlides(3);
  }
  
  loadDefaultHome(): void {
    this.homeService.getDefaultHome().subscribe({
      next: (response: any) => {
        console.log('Default Home:', response);
  
        // Ana veri
        this.home = response;
  
        // Fotoğrafları işleme
        if (response.photos?.$values && Array.isArray(response.photos.$values)) {
          // Fotoğrafları homePhotos dizisine ekle
          this.homePhotos = response.photos.$values.map((photo: any) => ({
            photo: photo.photoUrl.startsWith('http://') ? photo.photoUrl.replace('http://', 'https://') : photo.photoUrl,
          }));
          console.log('Home Photos:', this.homePhotos);
        } else {
          this.homePhotos = []; // Fotoğraflar yoksa boş bırak
        }
      },
      error: (error) => {
        console.error('Error loading default home:', error);
      }
    });
  }
  groupSlides(groupSize: number) {
    for (let i = 0; i < this.slides.length; i += groupSize) {
      this.groupedSlides.push(this.slides.slice(i, i + groupSize));
    }
  }
    loadSlides(): void {
      this.slideService.getAllSlides().subscribe({
        next: (response) => {
          console.log('Slides loaded:', response);
          this.slides = response; 
          this.groupSlides(3);
        },
        error: (error) => {
          console.error('Error loading slides:', error);
        }
      });
    }


}
