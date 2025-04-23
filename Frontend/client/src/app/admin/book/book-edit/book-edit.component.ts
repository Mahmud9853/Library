import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookParams } from 'src/app/shared/models/bookParams';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
 
  types: any[] = [];
  categories: any[] = [];
  authors: any[] = [];
  courses: any[] = [];
  book: any = {
    id: 0,
    title: '',
    description: '',
    createBook: '',
    typeId: 0,
    categoryId: 0,
    authorId: 0,
    courseId: 0,
    photoFile: null,
    documentFile: null
  };

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadTypes();
    this.loadCategories();
    this.loadAuthors();
    this.loadCourses();
    // Get book ID from the route and load book details
    const bookId = this.route.snapshot.params['id'];
    if (bookId) {
      this.loadBook();
    }
  }

  loadTypes() {
    this.bookService.getTypes().subscribe({
      next: (response: any) => {
        console.log('API Response type:', response);
        this.types = response;
      },
      error: (error) => console.log('Error fetching types:', error)
    });
  }

  loadAuthors() {
    this.bookService.getAuthors().subscribe({
      next: (response: any) => {
        console.log('API Response author:', response);
        this.authors = response;
      },
      error: (error) => console.log('Error fetching authors:', error)
    });
  }

  loadCategories() {
    this.bookService.getCategories().subscribe({
      next: (response: any) => {
        console.log('API Response category:', response);
        this.categories = response;
      },
      error: (error) => console.log('Error fetching categories:', error)
    });
  }
  loadCourses() {
    this.bookService.getCourses().subscribe({
      next: (response: any) => {
        console.log('API Response courses:', response);
        this.courses = response;
      },
      error: (error) => console.log('Error fetching courses:', error)
    });
  }

  loadBook(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (response: any) => {
          console.log('API Response:', response);  // API cevabını kontrol et
          this.book = response;
          // bookCourse verisinin doğru geldiğini kontrol et
          console.log('bookCourse:', this.book.bookCourse);
  
          if (this.book.createBook) {
            this.book.createBook = this.book.createBook.split('T')[0];
          }
          // Type, Category, Author eşleştirme
          if (this.book.bookType) {
            this.book.typeId = this.types.find(type => type.typeName === this.book.bookType)?.id || 0;
          }
          if (this.book.bookCategory) {
            this.book.categoryId = this.categories.find(category => category.name === this.book.bookCategory)?.id || 0;
          }
          if (this.book.bookAuthor) {
            this.book.authorId = this.authors.find(author => author.fullName === this.book.bookAuthor)?.id || 0;
          }
          if (this.book.bookCourse) {
            this.book.courseId = this.courses.find(course => course.title === this.book.bookCourse || course.description === this.book.bookCourse)?.id || 0;
          }
           // API'den gelen bookCourse verisini kullanarak courseId'yi belirle
        // if (this.book.bookCourse) {
        //   const foundCourse = this.courses.find(course =>
        //     course.title.trim().toLowerCase() === this.book.bookCourse.trim().toLowerCase()
        //   );
        //   if (foundCourse) {
        //     this.book.courseId = foundCourse.id;  // Eğer kurs varsa, courseId'yi güncelle
        //   } else {
        //     this.book.courseId = 0;  // Eğer kurs bulunamazsa, courseId'yi sıfırla
        //   }
        // } else {
        //   this.book.courseId = 0;  // Eğer bookCourse null ise, courseId sıfırlanacak
        // }
        },
        error: (error) => {
          console.error('Error loading book details:', error);
        }
      });
    }
  }
  
  onCourseChange(selectedCourseId: number) {
    const selectedCourse = this.courses.find(course => course.id === selectedCourseId);
    if (selectedCourse) {
      this.book.bookCourse = selectedCourse.title;  // Seçilen kursun başlığını ata
    } else {
      this.book.bookCourse = null;  // Eğer kurs yoksa, bookCourse null olacak
    }
  }
  
  
  

  onFileChange(event: any, fileType: 'photo' | 'document') {
    const file = event.target.files[0];
    if (fileType === 'photo') {
      this.book.photoFile = file;
    } else if (fileType === 'document') {
      this.book.documentFile = file;
    }
  }

  updateBook() {
    const formData = new FormData();
    formData.append('Title', this.book.title);
    formData.append('Description', this.book.description);
    formData.append('CreateBook', this.book.createBook);
    formData.append('TypeId', this.book.typeId.toString());
    formData.append('CategoryId', this.book.categoryId.toString());
    formData.append('AuthorId', this.book.authorId.toString());
    // formData.append('CourseId', this.book.courseId.toString());
    if (this.book.courseId && this.book.courseId > 0) {
      formData.append('CourseId', this.book.courseId.toString());
    }
    if (this.book.photoFile) {
      formData.append('PhotoFile', this.book.photoFile);
    }
    if (this.book.documentFile) {
      formData.append('DocumentFile', this.book.documentFile);
    }
  
    this.bookService.updateBook(this.book.id, formData).subscribe({
      next: (response: any) => {
        console.log('Book updated successfully:', response);
        // Backend'den dönen güncellenmiş veriyi atayın
        this.book = response;
        this.router.navigate(['/admin/book/book-list']); // Başarılı güncelleme sonrası yönlendirme
      },
      error: (err) => {
        console.error('Error updating book:', err);
      }
    });
  }
  

}
