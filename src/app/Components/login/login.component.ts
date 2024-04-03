import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { IUserLogin } from '../../Interfaces/IUserLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public successMessage: string = '';
  public errorMessage: { [key: string]: string[] } = {};
  public errorMessageKeys: string[] = [];
  constructor(public authService: AuthService, public router: Router) {}
  ReactiveForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get getEmail(): any {
    return this.ReactiveForm.controls['Email'];
  }
  get getPassword(): any {
    return this.ReactiveForm.controls['Password'];
  }
  login(e: Event) {
    e.preventDefault();
    if (this.ReactiveForm.invalid) {
      console.log('Form is invalid.');
      return;
    }
    const user: IUserLogin = {
      email: this.ReactiveForm.get('Email')?.value,
      password: this.ReactiveForm.get('Password')?.value,
    };
    this.authService.logIn(user).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        this.successMessage = 'Login successful!';
        this.errorMessageKeys = [];
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.errors) {
          for (const key of Object.keys(err.error.errors)) {
            this.errorMessage = err.error.errors;
            this.errorMessageKeys = Object.keys(this.errorMessage);
          }
        } else {
          this.errorMessage = {
            general: [err.error.message],
          };
          this.errorMessageKeys = ['general'];
        }
        this.successMessage = '';
      },
    });
  }
  togglePasswordVisibility() {
    const passwordInput = document.getElementById(
      'password-input'
    ) as HTMLInputElement;
    passwordInput.type =
      passwordInput.type === 'password' ? 'text' : 'password';
  }
}
