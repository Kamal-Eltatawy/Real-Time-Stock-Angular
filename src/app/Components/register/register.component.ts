import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { IUserRegister } from '../../Interfaces/IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  rolesList: string[] = ['Admin', 'User'];
  public successMessage: string = '';
  public errorMessage: { [key: string]: string[] } = {};
  public errorMessageKeys: string[] = [];

  constructor(public authService: AuthService) {}

  ReactiveForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Username: new FormControl('', [Validators.required]),
    ConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    roles: new FormArray([], Validators.required),
  });

  get getEmail(): any {
    return this.ReactiveForm.get('Email');
  }

  get getPassword(): any {
    return this.ReactiveForm.get('Password');
  }

  get getConfirmPassword(): any {
    return this.ReactiveForm.get('ConfirmPassword');
  }

  get getUsername(): any {
    return this.ReactiveForm.get('Username');
  }

  toggleRoleSelection(role: string) {
    const rolesFormArray = this.ReactiveForm.get('roles') as FormArray;
    if (rolesFormArray.value.includes(role)) {
      const index = rolesFormArray.value.indexOf(role);
      rolesFormArray.removeAt(index);
    } else {
      rolesFormArray.push(new FormControl(role));
    }
  }

  Register(e: Event) {
    e.preventDefault();

    if (this.ReactiveForm.invalid) {
      console.log('Form is invalid.');
      return;
    }

    if (this.getPassword.value !== this.getConfirmPassword.value) {
      console.log('Passwords do not match.');
      return;
    }

    const rolesSelected = this.ReactiveForm.get('roles')?.value;
    if (!rolesSelected || rolesSelected.length === 0) {
      console.log('At least one role must be selected.');
      return;
    }

    const user: IUserRegister = {
      firstName: this.ReactiveForm.get('FirstName')?.value,
      lastName: this.ReactiveForm.get('LastName')?.value,
      email: this.ReactiveForm.get('Email')?.value,
      userName: this.ReactiveForm.get('Username')?.value,
      password: this.ReactiveForm.get('Password')?.value,
      roles: rolesSelected,
      confirmPassword: this.ReactiveForm.get('ConfirmPassword')?.value,
    };

    this.authService.signUp(user).subscribe({
      next: (response) => {
        console.log('Registration successful!', response);
        this.successMessage = 'Registration successful!';
        this.errorMessageKeys = [];
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

  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById(
      'password-input'
    ) as HTMLInputElement;
    passwordInput.type =
      passwordInput.type === 'password' ? 'text' : 'password';
  }
}
