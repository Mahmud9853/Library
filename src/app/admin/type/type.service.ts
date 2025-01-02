import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Type } from 'src/app/shared/models/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
   types:  any[] = [];
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTypes(): Observable<any[]> {
      return this.http.get<any>(this.baseUrl + 'Type').pipe(
        map((response) => response.$values) // $values içindeki verileri alın
      );
    }
  addType(type: any) :Observable<Type> {
    return this.http.post<Type>(this.baseUrl + 'Type/create', type)
  }

  deleteType(id:number): Observable<any>{
    return this.http.delete<void>(`${this.baseUrl}Type/${id}`, {
    responseType: 'text' as 'json'
    });
  }
  updateType(id:number, type:any): Observable<Type>{
     return this.http.put<Type>(`${this.baseUrl+ 'Type/update'}/${id}`, type, {
      responseType: 'text' as 'json'
     });
     
  }
  getTypeById(id: number): Observable<Type>{
      return this.http.get<Type>(`${this.baseUrl + 'Type'}/${id}`);
  }
} 