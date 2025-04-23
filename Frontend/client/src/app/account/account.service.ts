import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  private role: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Account/register`, userData);
  }

  // login(userData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}Account/login`, userData);
  // }
  // login(loginData: { userName: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.baseUrl}Account/login`, loginData);
  // }
 
  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Account/login`, loginData).pipe(
      tap((response) => {
        if (response && response.userName) {
          localStorage.setItem('username', response.userName); // Kullanıcı adı localStorage'a kaydediliyor
        }
        if (response && response.role) {
          localStorage.setItem('role', response.role);  // Save the role to localStorage
        }
      })
    );
  }

  resetPassword(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Account/resetpassword`, formData, {
       responseType: 'text' as 'json'
    });
  }
  // Token ve Role'ü localStorage'da saklamak için yardımcı metodlar
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  // Kullanıcının login olup olmadığını kontrol etme
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Token'ı almak
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Rolü almak
  getRole(): string | null {
    const token = localStorage.getItem('token'); // JWT varsa al
    if (!token) return null;
  
    const payload = JSON.parse(atob(token.split('.')[1])); // JWT payload
    return payload.role || null; // Rolü döndür
  }
  
  getCurrentUser(): any {
    return this.  currentUser$; // Mevcut kullanıcı
  }
  
  // Çıkış yapma
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/account/login']);
  }
 
}
