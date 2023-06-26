import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 constructor(private authService: AuthService, private route:Router, private http:HttpClient){}

 ngOnInit(): void{}

 loginForm = new FormGroup({
  email: new FormControl("",[Validators.required, Validators.email]),
  password: new FormControl("",[
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(15)
  ])
 });

 get Email(): FormControl {
  return this.loginForm.get('email') as FormControl;
 }

 get Password(): FormControl {
  return this.loginForm.get('password') as FormControl;
 }

 loginSubmit(){
   this.authService.loginUser(this.loginForm.value).subscribe((res : any)=>{
     this.setToken(res);
     this.route.navigateByUrl('home');
  });
 }

 setToken(token: string){
  localStorage.setItem("access_token",token);
}
}
