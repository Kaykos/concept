import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private user: User;
  private userSubject: Subject<User> = new Subject<User>();

  /*
    Checks if user information is stored in local storage
    If it's true, return user information
    If it's false, return null

   */
  getCurrentUser() {
    if (!this.user) {
      const obj: any = window.localStorage.getItem('User');
      if (!obj) {
        return null;
      }
      this.user = User.getInstance(JSON.parse(obj));
    }
    return this.user;
  }

  getUserSubject(): Observable<User> {
    return this.userSubject.asObservable();
  }

  /*
    Stores user information in local storage
    Update observers

   */
  setCurrentUser(user: User) {
    this.user = user;
    window.localStorage.setItem('User', JSON.stringify(user));
    this.userSubject.next(this.user);
  }

  /*
    Clear user information in local storage
    Update observers

   */
  clear() {
    this.user = null;
    window.localStorage.clear();
    this.userSubject.next(this.user);
  }
}
