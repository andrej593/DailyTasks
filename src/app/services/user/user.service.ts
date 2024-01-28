import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const registerUrl = "http://localhost:3000/user/register";
const loginUrl = "http://localhost:3000/user/login";
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
export interface IResponseBody {
  user: UserReturnData,
  token: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  constructor() { }
  
  register(body:HttpParams){
    return this.http.post(registerUrl, body, options);
  }
  login(body:HttpParams){
    return this.http.post<IResponseBody>(loginUrl, body, options);
  }
}

const options = {
  //observe: 'response' as const,
  headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
}