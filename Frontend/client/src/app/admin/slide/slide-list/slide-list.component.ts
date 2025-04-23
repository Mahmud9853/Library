import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SlideService } from '../slide.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.scss']
})
export class SlideListComponent implements OnInit {
  slideToDelete: any = null;
  slides: any[] = [];
  slide: any;
  role: string | null = null;
  constructor(private fb: FormBuilder, private slideService: SlideService, private router: Router, private route: ActivatedRoute, private accountService: AccountService) {
      this.role = this.accountService.getRole();
    }
  ngOnInit(): void {
    this.loadSlides();
  }
  loadSlides(): void {
    this.slideService.getAllSlides().subscribe({
      next: (response) => {
        console.log('Slides loaded:', response);
        this.slides = response; 
      },
      error: (error) => {
        console.error('Error loading slides:', error);
      }
    });
  }
  
  openDeleteModal(slide: any) {
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    this.slideToDelete = slide;
    console.log('Selected slide for deletion:', slide); // Debug here
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modal = new (window as any).bootstrap.Modal(deleteModal); 
      modal.show();
    }
  }
  
  confirmDelete() {
    if (this.slideToDelete && this.slideToDelete.id) {
      console.log('Deleting slide with ID:', this.slideToDelete.id); 
      if (this.role !== 'Admin') {
        console.error('Erişim reddedildi: Sadece Admin silebilir.');
        return;
      }
      this.slideService.deleteSlide(this.slideToDelete.id).subscribe({
        next: (response: string) => {
          console.log('Delete response:', response);
          // Listeyi yeniden yükle
          this.loadSlides();
  
          // Modal'ı kapat
          const deleteModal = document.getElementById('deleteModal');
          if (deleteModal) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(deleteModal);
            modalInstance?.hide();
          }
  
          this.slideToDelete = null;
        },
        error: (err) => {
          console.error('Error deleting slide:', err);
          alert('Silme işlemi başarısız oldu.');
        },
      });
    } else {
      console.error('Invalid slide ID. slideToDelete:', this.slideToDelete);
    }
  }

}
