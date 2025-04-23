import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Home } from 'src/app/shared/models/home';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = environment.apiUrl;
  homes: any[] =[];
  homePhotos: any[] = [];

  constructor(private http: HttpClient) { }

   getHomes(): Observable<Home[]> {
      return this.http.get<any>(this.baseUrl + 'Home').pipe(
        map((response) => response.$values) // $values içindeki verileri alın
      );
    }
    gethomeById(id: number): Observable<Home>{
        return this.http.get<Home>(`${this.baseUrl + 'Home'}/${id}`);
    }

    addHome(homes: any): Observable<any>{
      return this.http.post(`${this.baseUrl + 'Home/create'}`, homes, { responseType: 'text' as 'json' });
      
    }
    deleteHome(id:number): Observable<any>{
      return this.http.delete<void>(`${this.baseUrl}Home/${id}`, {
      responseType: 'text' as 'json'
      });
    }

    updateHome(id:number , home:FormData): Observable<any>{
      return this.http.put(`${this.baseUrl}Home/update/${id}`, home, {
      responseType: 'text' as 'json'
      });
    }
      deletePhoto(id: number): Observable<string> {
        return this.http.delete<string>(`${this.baseUrl}Home/delete-photo/${id}`, {
        responseType: 'text' as 'json'
     });
    }

    getDefaultHome(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}Home/default-home`);
    }




}
