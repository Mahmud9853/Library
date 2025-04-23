import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePhotos } from 'src/app/shared/models/homePhotos';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent implements OnInit {
 home: any;
 homes: any[] = [];
 homePhotos: any[] = [];
   constructor(private homeService: HomeService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.loadHome();
  }
  loadHome() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    if (id) {
      this.homeService.gethomeById(id).subscribe({
        next: (response: any) => {
          console.log('API Response home:', response);

          // Ana bilgiyi ata
          this.home = response;

          // Fotoğrafları al ve homePhotos dizisine ata
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
          console.error('Error loading home details:', error);
        },
      });
    }
  }
  
  
  loadHomes() {
    this.homeService.getHomes().subscribe({
      next: (response) =>{
        console.log("API Response home:", response);
      },
      error: (error) => console.error('Error fetching books:', error)
    });
  }
  getBookDetail() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.homeService.gethomeById(id).subscribe({
       
        next: (response) => {
          console.log('API Response:', response); // Konsola yazdırın
          this.home = response;
        },
        error: (error) =>{
          console.error('Error loading home details:', error);
        }
      });
    }
  }
}
