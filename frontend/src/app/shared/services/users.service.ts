import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';

import {User} from '../models/user.model';

@Injectable()
export class UsersService {

  constructor(private http: Http){}

  getCurrentUser(): Observable<User>{
    return this.http.get(`${environment.apiBase}/users/current`)
      .map((response: Response) => {
        let user: User;
        if(response.json()){
          user = User.getInstance(response.json());
        }
        return user;
      });
  }

  search(params?: URLSearchParams): Observable<User[]>{
    let options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'}),
      search: params
    });
    return this.http.get(`${environment.apiBase}/services`, options)
      .map((response: Response) => UsersService.fromResponse(response));
  }

  private static fromResponse(response: Response): User[]{
    let list: User[] = [];
    for(let data of response.json()){
      list.push(User.getInstance(data));
    }
    return list;
  }
}
