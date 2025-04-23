import { Component, OnInit } from '@angular/core';
import { SlideService } from '../slide.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-slide-edit',
  templateUrl: './slide-edit.component.html',
  styleUrls: ['./slide-edit.component.scss']
})
export class SlideEditComponent implements OnInit {
  slide: any = {
    id: 0,
    photos: null
  }
  constructor(private slideService: SlideService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    const slideId = this.route.snapshot.params['id'];
    if (slideId) {
      this.loadSlide();
    }
  }
  
  onFileChange(event: any, fileType: 'photo') {
  const file = event.target.files[0];
  if (fileType === 'photo') {
    this.slide.photos = file; // photos'a atayın photos burda IFORMFILE photo ise string photo-dur
  }
}
  updateSlide(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    const formData = new FormData();
    if (this.slide.photo) {
      formData.append('Photos', this.slide.photos);
    }
    this.slideService.updateSlide(this.slide.id , formData).subscribe({
      next:(response: any) => {
        console.log('Slide updated successfully:', response);
        this.slide = response;
        this.router.navigate(['/admin/slide/slide-list']);

      },
      error: (error) => error.log("Fetch Error:", error)
    });
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
