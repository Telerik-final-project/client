import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['',  [Validators.maxLength(1024), Validators.required]],
      email: ['',  [Validators.email, Validators.required]],
      password: ['', [Validators.maxLength(256), Validators.required]],
    });
  }

  register() {
    console.log(this.registerForm.value)
    this.authService.register( this.registerForm.value ).subscribe((x) => console.log(x));
  }
}
