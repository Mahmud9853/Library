import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {
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
          this.router.navigate(['/admin/user/user-list']); // Login sayfasına yönlendirme
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
}
