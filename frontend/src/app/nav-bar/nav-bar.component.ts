import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../service/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  signedUser: string;
  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {}

  // if user is logged in, then get token info from local storage
  signedIn() {
    this.signedUser = localStorage.getItem('token');
    return this.signedUser;
  }

  // user sign out
  signOut() {
    localStorage.removeItem('token');

    this.alertify.success('Sign out successful');
  }
}
