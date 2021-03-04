import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css'],
})
export class UserSigninComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSignin(signinForm: NgForm) {
    const result = this.auth.authUser(signinForm.value);

    if (result) {
      localStorage.setItem('token', result.userName);
      this.alertify.success('Sign in successful');

      this.router.navigate(['/']);
    } else {
      this.alertify.error('Sign in failed');
    }
  }
}
