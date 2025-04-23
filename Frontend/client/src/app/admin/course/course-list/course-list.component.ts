import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { AccountService } from 'src/app/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit  {
courses: any[] = [];
courseToDelete: any = null;
role:string|null = null;
  constructor(private courseService: CourseService,private router: Router, private accountService: AccountService){
    this.role = this.accountService.getRole()
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (response: any) => {
        console.log("API response course:", response);
        this.courses = response;
        
      },
      error:  error => console.log('Error fetching course:', error)

    })
  }


  openDeleteModal(course: any) {
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    this.courseToDelete = course;
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modal = new (window as any).bootstrap.Modal(deleteModal); // 'window as any' ile tip belirtme
      modal.show();
    }
  }
  confirmDelete() {
    if (this.role !== 'Admin') {
      console.error('Erişim reddedildi: Sadece Admin silebilir.');
      return;
    }
    if (this.courseToDelete) {
      // API çağrısı yapılır
      this.courseService.deleteCourse(this.courseToDelete.id).subscribe({
        next: (response: string) => {
          // Silme işleminden sonra kitap listesine ekleme
          console.log('Delete response:', response); // '4: Deleted.'
          this.courses = this.courses.filter((b) => b.id !== this.courseToDelete.id);
  
          // Modalı kapat
          const deleteModal = document.getElementById('deleteModal');
          if (deleteModal) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(deleteModal);
            modalInstance?.hide(); // Modal'ı kapat
          }
  
          // Kitaplar silindikten sonra yönlendirme yapılır
          this.router.navigate(['/admin/course/course-list']);
          this.courseToDelete = null;
        },
        error: (err) => {
          console.error('Error deleting type:', err);
        },
      });
    }
  }

}
