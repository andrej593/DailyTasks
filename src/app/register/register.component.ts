import { Component } from '@angular/core';
import { MaterialsModule } from '../material/material.module';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  hiden = true;
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
    if (this.registerForm.valid) {
      const url = "http://localhost:3000/user/register";
      const body = new HttpParams()
        .set('name', this.registerForm.controls.name.value)
        .set('surname', this.registerForm.controls.surname.value)
        .set('email', this.registerForm.controls.email.value)
        .set('password', this.registerForm.controls.password.value);
      const options = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
      this.http.post(url, body, options).subscribe(() => {
        this.router.navigateByUrl('/login');
      });
    } else {
      console.log("Form not valid!");
    }
  }

  getControlError(inputName: keyof User) {
    if (this.registerForm.controls[inputName].hasError('required')) return ErrorMessages['required'];
    if (this.registerForm.controls[inputName].hasError('email')) return ErrorMessages['email'];
    if (this.registerForm.controls[inputName].hasError('pattern')) return ErrorMessages['pattern'];
    return ''
  }
  getFormError() {
    return this.registerForm.hasError('passwordNoMatch') ? ErrorMessages['passwordNoMatch'] : '';
  }
}
interface User {
  name: string;
  surname: string;
  email: string;
  password: string,
  passwordConfirm: string
}
type UserControls = { [key in keyof User]: AbstractControl };

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