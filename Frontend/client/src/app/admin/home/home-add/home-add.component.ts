import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
  styleUrls: ['./home-add.component.scss']
})
export class HomeAddComponent {

  homeForm: FormGroup;
  photos: File[] = [];
  photosError: string | null = null;
  
  constructor(private fb: FormBuilder, private homeService: HomeService, private router: Router ) {
    this.homeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photos: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.photos = Array.from(event.target.files);
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('title', this.homeForm.get('title')?.value);
    formData.append('description', this.homeForm.get('description')?.value);

    this.photos.forEach(photo => {
      formData.append('photos', photo);
    });

    this.homeService.addHome(formData).subscribe(
      (response) => {
        console.log('Response:', response);
        alert('Home created successfully!');
        this.router.navigate(['/admin/home/home-list']);
      },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred while creating the home.');
      }
    );
  }
}
