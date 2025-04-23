import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from 'src/app/shared/models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;
  UserDto: any[] = [];
  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserDto[]>{
    return this.http.get<any>(`${this.baseUrl}Account/users`).pipe(
      map((response) => response.$values) 
    );
  }
  getRoles(): Observable<string[]> {
    return this.http.get<any>(`${this.baseUrl}Account/roles`).pipe(
      tap((response: any) => console.log("API Backend Response:", response)), // Yanıtı konsola yazdırır
      map((response) => response.$values) // Veriyi dönüştürmeye devam eder
    );
  }

  changeUserRole(userId: string, roles: string[]): Observable<any> {
    const formData = new FormData();
    formData.append('UserId', userId);
    roles.forEach((role, index) => formData.append(`Roles[${index}]`, role));

    return this.http.post(`${this.baseUrl}Account/change-role`, formData);
  }
  deleteUser(id:string) {
      return this.http.delete(`${this.baseUrl}Account/delete/${id}`);
  }
  updateUser(id: number, user: any) {
    return this.http.put(`${this.baseUrl}Account/update/${id}`, user, {
      responseType: 'text' as 'json'
    });
  }
  getUserById(id: number) {
    return this.http.get<any>(`${this.baseUrl}Account/user/${id}`);
  }
  
}
