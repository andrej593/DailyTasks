import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialsModule } from '../material/material.module';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

interface UserReturnData {
  name: string;
  surname: string;
  email: string;

  dateOfBirth?: string;
  phoneNumber?: number;
  profilPicture?: string;

  //password
  //authorityLvl:number;
  //taskList:Array<ITask>;
}

interface IResponseBody {
  user: UserReturnData,
  token: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hiden = true;
  http = inject(HttpClient);
  router = inject(Router);
  auth = inject(AuthService);

  serverError = '';
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  } as UserControls);

  sumbitForm() {
    if (this.loginForm.valid) {
      const url = "http://localhost:3000/user/login";
      const body = new HttpParams()
        .set('email', this.loginForm.controls.email.value)
        .set('password', this.loginForm.controls.password.value);
      const options = {
        //observe: 'response' as const,
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
      this.http.post<IResponseBody>(url, body, options).subscribe({
        next: (body: IResponseBody) => {
          this.serverError ="";
          localStorage.setItem('access_token', body.token);
          this.auth.setLoggedIn();
          this.router.navigateByUrl('/protected/userHome');
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.status);
          if (err.status === 404) {
            this.serverError = "User not found.";
          } else if (err.status === 401) {
            this.serverError = "Wrong password.";
          } else if (err.status === 500) {
            this.serverError = "Error connection to database.";
          }
        }
      });
    } else {
      this.serverError = "Form not valid!";
    }
  }

  getControlError(inputName: keyof User) {
    if (this.loginForm.controls[inputName].hasError('required')) return ErrorMessages['required'];
    if (this.loginForm.controls[inputName].hasError('email')) return ErrorMessages['email'];
    return ''
  }
}
interface User {
  email: string,
  password: string
}
type UserControls = { [key in keyof User]: AbstractControl };

const ErrorMessages = {
  required: 'You must enter a value.',
  email: 'You must enter an email.'
}
