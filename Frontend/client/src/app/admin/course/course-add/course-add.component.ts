import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {
  course: any = {
    title:'',
    description: '',
  };
  constructor(private courseService: CourseService,  private router: Router){}
  ngOnInit(): void {
    
  }

  addCourse(): void {
    const formData = new FormData();
    formData.append('title', this.course.title);
    formData.append('description', this.course.description);

    this.courseService.addCourse(formData).subscribe({
      next: (response) => {
        console.log('Course added successfully:', response);
        this.router.navigate(['/admin/course/course-list']);
      },
      error: (err) => {
        console.error('Error adding type:', err);
      }
    })

  }

}
