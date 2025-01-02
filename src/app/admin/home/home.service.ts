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


  

}
