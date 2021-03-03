import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        userName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
        mobile: new FormControl(null, [
          Validators.required,
          Validators.maxLength(10),
        ]),
      },
      this.passwordMatchingValidator
    );
  }

  // Custom validator
  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value
      ? null
      : { notmatched: true };
  }

  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  get userName() {
    return this.signupForm.get('userName') as FormControl;
  }
  get email() {
    return this.signupForm.get('email') as FormControl;
  }
  get password() {
    return this.signupForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword') as FormControl;
  }
  get mobile() {
    return this.signupForm.get('mobile') as FormControl;
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
