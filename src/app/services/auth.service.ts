import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseURL = "https://localhost:44343/api/"

  registerUser(data: any): Observable<any> {
    return this.http.post(this.baseURL + 'User/CreateUser', data,{responseType: 'text'});
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(this.baseURL + 'User/LoginUser', data,{responseType: 'text'});
  }

  setToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') ? true : false
  }
}
