import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Author } from 'src/app/shared/models/author';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = environment.apiUrl;
  authors: any[] = [];
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
      return this.http.get<any>(this.baseUrl + 'Author').pipe(
        map((response) => response.$values) // $values içindeki verileri alın
      );
  }

  addAuthor(author: any) :Observable<Author> {
      return this.http.post<Author>(this.baseUrl + 'Author/create', author)
  }
    
  deleteAuthor(id:number): Observable<any>{
      return this.http.delete<void>(`${this.baseUrl}Author/${id}`, {
      responseType: 'text' as 'json'
      });
  }
  updateAuthor(id:number, author:any): Observable<Author>{
     return this.http.put<Author>(`${this.baseUrl+ 'Author/update'}/${id}`, author, {
        responseType: 'text' as 'json'
     });
  }
 
  getAuthorById(id: number): Observable<Author>{
     return this.http.get<Author>(`${this.baseUrl + 'Author'}/${id}`);
  }
}