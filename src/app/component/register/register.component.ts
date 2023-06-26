import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  repeatPass: string = 'none';
  displayMsg: string = '';
  isAccountCreated: boolean = false;
  constructor(private authService: AuthService) { }

  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
    email: new FormControl("", [Validators.required, Validators.email]),
    mobile: new FormControl("", [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)]),
    gender: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    rpwd: new FormControl("", [Validators.required])
  });

  registerSubmit() {
    if (this.registerForm.controls.password.value == this.registerForm.controls.rpwd.value) {
      this.authService.registerUser(this.registerForm.value).subscribe((res : any) => {
        if (res == 'Success') {
          this.displayMsg = 'Account created successfully.';
          this.isAccountCreated = true;
        } else if (res == 'AlreadyExist') {
          this.displayMsg = 'Account Already Exist. Try another Email.';
          this.isAccountCreated = false;
        } else {
          this.displayMsg = 'Something went wrong.';
          this.isAccountCreated = false;
        }
      });
    } else {
      this.repeatPass = 'inline';
    }
  }

  get FirstName(): FormControl {
    return this.registerForm.get("firstName") as FormControl
  }

  get LastName(): FormControl {
    return this.registerForm.get("lastName") as FormControl
  }

  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl
  }

  get Mobile(): FormControl {
    return this.registerForm.get("mobile") as FormControl
  }

  get Gender(): FormControl {
    return this.registerForm.get("gender") as FormControl
  }

  get Password(): FormControl {
    return this.registerForm.get("password") as FormControl
  }
}
