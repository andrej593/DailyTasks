import { Component, inject } from '@angular/core';
import { MaterialsModule } from '../material/material.module';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  http = inject(HttpClient);
  router = inject(Router);

  passwordMatch = ''

  formErrors:IUser = {
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  hiden = true;
  serverError = '';
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    surname: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?!.* )(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$'),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?!.* )(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$'),
    ]),
  } as UserControls, passwordNoMatch);


  sumbitForm() {
    this.passwordMatch = this.getFormError();
    for (const key in this.formErrors) {
      this.formErrors[<keyof IUser>key] = this.getControlErrors(<keyof IUser>key);
    }

    if (this.registerForm.valid) {
      this.serverError='';
      const url = "http://localhost:3000/user/register";
      const body = new HttpParams()
        .set('name', this.registerForm.controls.name.value)
        .set('surname', this.registerForm.controls.surname.value)
        .set('email', this.registerForm.controls.email.value)
        .set('password', this.registerForm.controls.password.value);
      const options = {
        //observe: 'response' as const,
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
      this.http.post(url, body, options).subscribe({
        next: (res) => {
          this.serverError = "";
          this.router.navigateByUrl('/login');
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.serverError = "User already exists.";
          } else if (err.status === 500) {
            this.serverError = "Error connection to database.";
          }
        }
      });
    } else {
      this.serverError = "Form not valid!";
    }
  }

  getControlErrors(inputName: keyof IUser) {
    if (this.registerForm.controls[inputName].hasError('required')) return ErrorMessages['required'];
    if (this.registerForm.controls[inputName].hasError('email')) return ErrorMessages['email'];
    if (this.registerForm.controls[inputName].hasError('pattern')) return ErrorMessages['pattern'];
    return ''
  }
  getFormError() {
    return this.registerForm.hasError('passwordNoMatch') ? ErrorMessages['passwordNoMatch'] : '';
  }
}
interface IUser {
  name: string,
  surname: string,
  email: string,
  password: string,
  passwordConfirm: string
}

type UserControls = { [key in keyof IUser]: AbstractControl };

const ErrorMessages = {
  required: 'You must enter a value.',
  email: 'You must enter an email.',
  pattern: 'Must contain 1 lowercase, 1 uppercase, 1 number and be between 8 and 16 characters long',
  passwordNoMatch: 'Password and confirmation password do not match.',
}

function passwordNoMatch(group: AbstractControl): ValidationErrors | null {
  const pass1 = group.value.password;
  const pass2 = group.value.passwordConfirm;
  return (pass1 !== pass2) ? { passwordNoMatch: true } : null

}