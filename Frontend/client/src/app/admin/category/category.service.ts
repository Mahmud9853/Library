import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   category:  any[] = [];
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
        return this.http.get<any>(this.baseUrl + 'Category').pipe(
          map((response) => response.$values) // $values içindeki verileri alın
        );
      }
    addCategory(category: any) :Observable<Category> {
      return this.http.post<Category>(this.baseUrl + 'Category/create', category)
    }
  
    deleteCategory(id:number): Observable<any>{
      return this.http.delete<void>(`${this.baseUrl}Category/${id}`, {
      responseType: 'text' as 'json'
      });
    }
    updateCategory(id:number, category:any): Observable<Category>{
       return this.http.put<Category>(`${this.baseUrl+ 'Category/update'}/${id}`, category, {
        responseType: 'text' as 'json'
       });
       
    }
    getCategoryById(id: number): Observable<Category>{
        return this.http.get<Category>(`${this.baseUrl + 'Category'}/${id}`);
    }
}
