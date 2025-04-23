import { Component, OnInit } from '@angular/core';
import { SlideService } from '../slide.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-slide-detail',
  templateUrl: './slide-detail.component.html',
  styleUrls: ['./slide-detail.component.scss']
})
export class SlideDetailComponent implements OnInit {
 slide: any;
 constructor(private slideService: SlideService,  private route: ActivatedRoute,){}
 ngOnInit(): void {
  this.loadSlide();
}

loadSlide() : void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if(id){
    this.slideService.getSlideById(id).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Konsola yazdırın
        this.slide = response;
      },
      error: (error) =>{
        console.error('Error loading slide details:', error);
      }
    });
  }
}


}
