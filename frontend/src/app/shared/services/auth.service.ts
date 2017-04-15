import {Injectable} from '@angular/core';

import {User} from '../models/user.model';

@Injectable()
export class AuthService{
  user: User;

  getCurrentUser(){
    if(!this.user){
      let obj: any = window.localStorage.getItem('u');
      if(!obj){
        return null;
      }
      this.user = User.getInstance(JSON.parse(obj));
    }
    return this.user;
  }

  setCurrentUser(user: User){
    this.user = user;
    window.localStorage.setItem('u', JSON.stringify(user))
  }

  clear(){
    this.user = null;
    window.localStorage.clear();
  }
}
