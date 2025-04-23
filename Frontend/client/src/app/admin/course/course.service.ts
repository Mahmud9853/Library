import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Course } from 'src/app/shared/models/course';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
private baseUrl = environment.apiUrl
courses: any[] = [];

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<any>(this.baseUrl + 'Course').pipe(
       map((response) => response.$values) // $values içindeki verileri alın
    );
  } 
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Course/${id}`, {
      responseType: 'text' as 'json'
    });
  }

  addCourse(course: any): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}Course/create`, course);
  }
  updateCourse(id: number, course: any): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}Course/update/${id}`, course,{
        responseType: 'text' as 'json'
    });
  }
    getCourseById(id: number): Observable<Course>{
       return this.http.get<Course>(`${this.baseUrl + 'Course'}/${id}`);
    }
}
