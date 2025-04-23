import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
  registerForm: FormGroup;
  errorMessage: string | null = null;

   constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+}{":;\',.<>?/]).*'),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = new FormData();
    formData.append('UserName', this.registerForm.get('userName')?.value);
    formData.append('Email', this.registerForm.get('email')?.value);
    formData.append('Name', this.registerForm.get('name')?.value);
    formData.append('Surname', this.registerForm.get('surname')?.value);
    formData.append(
      'BirthDate',
      new Date(this.registerForm.get('birthDate')?.value).toISOString() // ISO format
    );
    formData.append('Password', this.registerForm.get('password')?.value);
    formData.append('ConfirmPassword', this.registerForm.get('confirmPassword')?.value);

    this.accountService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['account/login']); // Login sayfasına yönlendirme
      },
      error: (error) => {
        console.error('Error detayları:', error);
    
        // Backend'den gelen hata yanıtını kontrol et
        if (error.error && error.error.errors) {
            // errors dizisini al
            const backendErrors = error.error.errors["$values"];
            
            // Eğer errors dizisi varsa, her hata mesajını işleyelim
            if (Array.isArray(backendErrors)) {
                backendErrors.forEach((err: string) => {
                    alert(err); // Her hatayı alert olarak göster
                });
            }
        } else {
            // Beklenmeyen bir hata durumu
            console.error('Beklenmeyen hata yapısı:', error);
            alert('Beklenmeyen bir hata oluştu.');
        }
      }
    });
  }
  
}



  