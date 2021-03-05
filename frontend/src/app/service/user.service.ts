import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  addUserToLocalStorage(user: User) {
    let users = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users'));
      users = [...users, user];
    } else {
      users = [user];
    }

    localStorage.setItem('Users', JSON.stringify(users));
  }
}