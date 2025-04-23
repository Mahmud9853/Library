import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { map, Observable } from 'rxjs';
import {Book, PaginatedResponse} from 'src/app/shared/models/book'; 
import { BookParams } from 'src/app/shared/models/bookParams';
import { Type } from 'src/app/shared/models/type';
import { Course } from 'src/app/shared/models/course';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = environment.apiUrl;
  books:  any[] = [];
  types: any[] = [];
  authors: any[] = [];
  courses: any[] = [];
  constructor(private http: HttpClient) { }

  getBookss(bookParams: BookParams): Observable<{ books: Book[]; totalRecords: number }> {
    let params = new HttpParams();
  
    if (bookParams.search) params = params.append('search', bookParams.search);
    if (bookParams.pageNumber) params = params.append('pageNumber', bookParams.pageNumber.toString());
    if (bookParams.pageSize) params = params.append('pageSize', bookParams.pageSize.toString());
    if (bookParams.typeId) params = params.append('typeId', bookParams.typeId.toString());
    if (bookParams.categoryId) params = params.append('categoryId', bookParams.categoryId.toString());
    if (bookParams.authorId) params = params.append('authorId', bookParams.authorId.toString());
    // if (bookParams.courseId) params = params.append('courseId', bookParams.courseId.toString());
    if (bookParams.courseId != null && bookParams.courseId > 0) { 
      params = params.append('courseId', bookParams.courseId.toString());
    }
    
    return this.http.get<any>(`${this.baseUrl}Book/query`, { params }).pipe(
      map((response) => {
        const books = response.books?.$values || [];
        const totalRecords = response.totalRecords || 0;
        return { books, totalRecords };
      })
    );
  }
  
  // getBookss(bookParams: BookParams): Observable<{ books: Book[]; totalRecords: number }> {
  //   let params = new HttpParams();
  
  //   if (bookParams.search) params = params.append('search', bookParams.search);
  //   if (bookParams.pageNumber) params = params.append('currentPage', bookParams.pageNumber.toString());
  //   if (bookParams.pageSize) params = params.append('pageSize', bookParams.pageSize.toString());
  //   if (bookParams.typeId) params = params.append('typeId', bookParams.typeId);
  //   if (bookParams.categoryId) params = params.append('categoryId', bookParams.categoryId);
  //   if (bookParams.authorId) params = params.append('authorId', bookParams.authorId);
  
  //   return this.http.get<any>(`${this.baseUrl}Book/query`, { params }).pipe(
  //     map((response) => {
  //       const books = response.books?.$values || []; // $values içindeki verileri al
  //       const totalRecords = response.totalRecords || 0;
  //       return { books, totalRecords };
  //     })
  //   );
  // }
  
  
  getBooks(): Observable<Book[]> {
    return this.http.get<any>(this.baseUrl + 'Book').pipe(
      map((response) => response.$values) // $values içindeki verileri alın
    );
  }
  getTypes(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'Type').pipe(
      map((response) => response.$values) // $values içindeki verileri alın
    );
  }
  getAuthors(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'Author').pipe(
      map((response) => response.$values) // $values içindeki verileri alın
    );
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'Category').pipe(
      map((response) => response.$values) // $values içindeki verileri alın
    );
  }
  getCourses(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'Course').pipe(
      map((response) => response.$values) // $values içindeki verileri alın
    );
  }
  // getBooks(bookParams: BookParams): Observable<any> {
  //   let params = new HttpParams()
  //     .set('currentPage', bookParams.pageNumber.toString())
  //     .set('pageSize', bookParams.pageSize.toString());
  
  //   if (bookParams.search) {
  //     params = params.set('search', bookParams.search);
  //   }
  //   if (bookParams.typeId) {
  //     params = params.set('typeId', bookParams.typeId);
  //   }
  //   if (bookParams.categoryId) {
  //     params = params.set('categoryId', bookParams.categoryId);
  //   }
  //   if (bookParams.authorId) {
  //     params = params.set('authorId', bookParams.authorId);
  //   }
  
  //   return this.http.get<any>(`${this.baseUrl}Book/query?`, { params }).pipe(
  //     map((response) => {
  //       return {
  //         books: response.$values,
  //         totalCount: response.totalCount,
  //       };
  //     })
  //   );
  // }
  
  
  addBook(book: any, headers: HttpHeaders): Observable<Book> {
    return this.http.post<Book>(this.baseUrl + 'Book/create', book);
  }
  updateBook(id:number, book:any): Observable<Book>{
    return this.http.put<Book>(`${this.baseUrl+ 'Book/update'}/${id}`, book);
  }
  deleteBook(id:number): Observable<any>{
    return this.http.delete<void>(`${this.baseUrl}Book/${id}`, {
    responseType: 'text' as 'json'
    });
  }
  getBookById(id: number): Observable<Book>{
    return this.http.get<Book>(`${this.baseUrl + 'Book'}/${id}`);
  }
  downloadBook(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}Book/download/${id}`, { responseType: 'blob' });
  }
  

  // getBook(params: any): Observable<{ books: { $values: Book[] }; totalRecords: number }> {
  //   return this.http.get<{ books: { $values: Book[] }; totalRecords: number }>(
  //     `${this.baseUrl}/Book/query`, { params }
  //   );
  // }
  
  // getBooks(bookParams: any): Observable<any> {
  //   let params = new HttpParams()
  //     .set('currentPage', bookParams.pageNumber || 1)
  //     .set('pageSize', bookParams.pageSize || 10);

  //   if (bookParams.search) params = params.set('search', bookParams.search);
  //   if (bookParams.typeId) params = params.set('typeId', bookParams.typeId);
  //   if (bookParams.categoryId) params = params.set('categoryId', bookParams.categoryId);
  //   if (bookParams.authorId) params = params.set('authorId', bookParams.authorId);

  //   return this.http.get<any>(`${this.baseUrl}Book/query`, { params });
  // }
 

 
}
