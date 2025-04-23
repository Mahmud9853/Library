import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { Home } from 'src/app/shared/models/home';
import { HomePhotos } from 'src/app/shared/models/homePhotos';

@Component({
  selector: 'app-home-edit',
  templateUrl: './home-edit.component.html',
  styleUrls: ['./home-edit.component.scss']
})
export class HomeEditComponent implements OnInit {
  updateForm: FormGroup;
  selectedFiles: File[] = [];
  homeId!: number;
  home: Home | undefined;
  homePhotos: any[] = [];
  photosToDelete: number[] = []; // Silinecek fotoğraf ID'lerini tutan dizi
  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      title: [''],
      description: [''],
    });

    this.homeId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadHomeDetails();

  }

  loadHomeDetails(): void {
    this.homeService.gethomeById(this.homeId).subscribe({
      next: (response: any) => {
        console.log('Home Details:', response);
        this.home = response;
        
        // Formu güncelle
        this.updateForm.patchValue({
          title: response.title,
          description: response.description,
        });
  
        // Fotoğrafları al ve homePhotos dizisine ata
        if (response.photos?.$values && Array.isArray(response.photos.$values)) {
          // Fotoğrafları homePhotos dizisine ekle
          this.homePhotos = response.photos.$values.map((photo: any) => ({
            id: photo.id, // Fotoğrafın id'sini ekledik
            photo: photo.photoUrl.startsWith('http://') ? photo.photoUrl.replace('http://', 'https://') : photo.photoUrl,
          }));
          console.log('Home Photos:', this.homePhotos);
        } else {
          this.homePhotos = []; // Fotoğraflar yoksa boş bırak
        }
      },
      error: (err) => {
        console.error('Error fetching home details:', err);
        alert('An error occurred while loading the home details.');
      }
    });
  }
  

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

deletePhoto(id: number): void {
  console.log('Making DELETE request for photo with ID:', id); // Konsola ID yazdırma

  // Fotoğrafı silme işlemi
  this.homeService.deletePhoto(id).subscribe({
    next: (response: any) => {
      console.log('Fotoğraf başarıyla silindi:', response);
      alert('Fotoğraf başarıyla silindi!');
  
      // Fotoğrafı homePhotos dizisinden çıkarın
      this.homePhotos = this.homePhotos.filter(photo => photo.id !== id);
    },
    error: (err) => {
      console.error('Fotoğraf silinirken hata oluştu:', err);
      alert('Fotoğraf silinirken bir hata oluştu.');
    }
  });
}
  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.updateForm.get('title')?.value || '');
    formData.append('description', this.updateForm.get('description')?.value || '');

    // Silinen fotoğrafları formData'ya ekleyin
    formData.append('photosToDelete', JSON.stringify(this.photosToDelete));

    // Yeni fotoğrafları ekleyin
    for (const file of this.selectedFiles) {
      formData.append('photos', file);
    }

    this.homeService.updateHome(this.homeId, formData).subscribe({
      next: (response) => {
        console.log('Update response:', response);
        alert('Home updated successfully!');
        this.router.navigate(['/admin/home/home-list']);
      },
      error: (err) => {
        console.error('Error updating home:', err);
        alert('An error occurred while updating the home.');
      }
    });
  }
}
