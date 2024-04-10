import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: any = {};
  loggedIn = false;
  showPassword: boolean = false; 

  constructor(private router: Router) { }

  onSubmit() {
    this.loggedIn = true;
    // Clear the form fields
    this.formLogin.username = '';
    this.formLogin.password = '';
  }

  closeSuccessAlert() {
    this.loggedIn = false;
  }

  // Add this method
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
