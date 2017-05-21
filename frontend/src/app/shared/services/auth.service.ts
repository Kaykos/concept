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
    If it's false, return default user

   */
  getCurrentUser() {
    if (!this.user) {
      const object = window.localStorage.getItem('User');
      if (!object) {
        this.user = {
          id: 0,
          name: 'Invitado',
          lastName: '',
          email: '',
          username: '',
          role: 'invitado',
          userImage: 'https://storage.googleapis.com/events-concept.appspot.com/img/users/default.png',
          imageData: '',
          extension: ''
        };
      }
      else {
        this.user = JSON.parse(object);
      }
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
    window.localStorage.setItem('User', JSON.stringify(this.user));
    this.userSubject.next(this.user);
  }

  /*
    Clear user information in local storage
    Update observers

   */
  clear() {
    this.user = {
      id: 0,
      name: 'Invitado',
      lastName: '',
      email: '',
      username: '',
      role: 'invitado',
      userImage: 'https://storage.googleapis.com/events-concept.appspot.com/img/users/default.png',
      imageData: '',
      extension: ''
    };
    window.localStorage.clear();
    this.userSubject.next(this.user);
  }
}
