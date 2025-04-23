import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  resetPasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      userName: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    console.log(this.resetPasswordForm.valid);  // Form geçerliliğini kontrol et
    if (!this.resetPasswordForm.valid) {  // Form geçerli değilse işlem yapma
      console.error('Form is invalid');    // Form geçerli değilse hata mesajı ver
      return;
    }

    // Form verilerini al
    const formData = {
      userName: this.resetPasswordForm.get('userName')?.value,
      newPassword: this.resetPasswordForm.get('newPassword')?.value
    };
  
    // Şifre sıfırlama işlemi
    this.accountService.resetPassword(formData).subscribe({
      next: (response) => {
        console.log(response);  // Burada response.message yerine sadece response olabilir
        this.message = response;  // Eğer response bir string mesajsa
        this.router.navigate(['account/login']);
      },
      error: (error) => {
        console.error('Backend Error: ', error);  // Hata mesajını konsola yazdırın
        this.message = error.error.message || 'Bir hata oluştu.';
      }
    });
}

  
  
}
