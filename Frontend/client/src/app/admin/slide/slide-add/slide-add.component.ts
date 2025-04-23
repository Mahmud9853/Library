import { Component, OnInit } from '@angular/core';
import { SlideService } from '../slide.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-add',
  templateUrl: './slide-add.component.html',
  styleUrls: ['./slide-add.component.scss']
})
export class SlideAddComponent implements OnInit{
  slide = {
    photo: null,
  };

  constructor(private slideService: SlideService, private router: Router){}

  ngOnInit(): void {

  }
  onFileChange(event: any, fileType: 'photo' ) {
    const file = event.target.files[0];
    if (fileType === 'photo') {
      this.slide.photo = file;
    } 
  }
  addSlide() {
        const formData = new FormData();
        if (this.slide.photo) {
          formData.append('Photos', this.slide.photo);
        }
        this.slideService.createSlide(formData).subscribe({
          next: (response) => {
            console.log('Slide added successfully:', response);
            this.router.navigate(['/admin/slide/slide-list']);
          },
          error: (err) => {
            console.error('Error adding slide:', err);
          }
        });
  }
}
