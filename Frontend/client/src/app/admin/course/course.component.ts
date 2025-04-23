import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courses: any[] = [];
  role: string | null = null;
  constructor(private courseService: CourseService, private router: Router, private accountService: AccountService) {
    this.role = this.accountService.getRole()
  }


  ngOnInit(): void {
    this.loadCourses();
  }
  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (response: any) => {
        console.log('API Response Course:', response);
        this.courses = response;
      },
      error:  error => console.log('Error fetching course:', error)
    })
  }

}
