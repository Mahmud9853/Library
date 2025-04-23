import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private baseUrl = environment.apiUrl;
  slides: any[] = [];
  slide: any;
  constructor(private http: HttpClient) {}

  getAllSlides(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}Slide`).pipe(
      map((response) => response.$values) // $values içindeki verileri Slide[] tipine dönüştür
    );
  }

  getSlideById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Slide/${id}`); // $values içindeki verileri Slide[] tipine dönüştür
  }

  createSlide(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Slide/create`, formData);
  }

  updateSlide(id: number, slide: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}Slide/update/${id}`, slide);
  }

  deleteSlide(id: number): Observable<any> {
    return this.http.delete<void>(`${this.baseUrl}Slide/${id}`, {
      responseType: 'text' as 'json'
      });
  }
}
    

