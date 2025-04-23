import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const loginData = {
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.accountService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response && response.token && response.role) {
          this.accountService.saveToken(response.token);
          this.accountService.setRole(response.role);
          
          // Kullanıcının rolüne göre yönlendirme
          if (response.role === 'Admin' || response.role === 'Client') {
            this.router.navigate(['/home']);  // Home sayfasına yönlendir
          } else {
            this.errorMessage = 'Unauthorized role';
          }
        } else {
          this.errorMessage = 'Invalid username or password';
          alert("Istifadəçi adı və ya Parol səhvdir");
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'An error occurred during login';
        alert("İstifadəçi adı və ya Parol səhvdir");
      }
    });
  }
}
