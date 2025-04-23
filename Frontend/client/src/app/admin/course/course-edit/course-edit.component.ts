import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  course: any = {
    id:0,
    title:'',
    description: ''
  }
  constructor(private courseService: CourseService,private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    const authorId = this.route.snapshot.params['id'];
    if (authorId) {
      this.loadCourse();
    }
  }

  loadCourse() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.courseService.getCourseById(id).subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          this.course = response;
        },
        error: (error) => {
          console.error('Error loading type details:', error);
        }
      });
    }
  }

  updateCourse(): void {
    const formData = new FormData();
    formData.append('title', this.course.title);
    formData.append('description', this.course.description);

    this.courseService.updateCourse(this.course.id, formData).subscribe ({
      next: (response: any) => {
        console.log('Course updated successfully:', response);
        // Backend'den dönen güncellenmiş veriyi atayın
        this.course = response;
        this.router.navigate(['/admin/course/course-list']); // Başarılı güncelleme sonrası yönlendirme
      },
      error: (error) => {
        console.error('Error updating course:', error);
      }
    });
  }


}
