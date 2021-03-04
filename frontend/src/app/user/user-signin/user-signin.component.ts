import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/service/alertify.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css'],
})
export class UserSigninComponent implements OnInit {
  constructor(private auth: AuthService, private alertify: AlertifyService) {}

  ngOnInit(): void {}

  onSignin(signinForm: NgForm) {
    const result = this.auth.authUser(signinForm.value);

    if (result) {
      localStorage.setItem('token', result.userName);
      this.alertify.success('Sign in successful');
    } else {
      this.alertify.error('Sign in failed');
    }
  }
}
