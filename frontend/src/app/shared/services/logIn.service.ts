import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {PropsMapping} from './model.service';

import {User} from '../models/user.model';

@Injectable()
export class LogInService {
  /*
    Mapping with server json fields

   */
  static propsMapping: PropsMapping = {
    id: 'id',
    name: 'name',
    lastName: 'last_name',
    email: 'email',
    username: 'user_name',
    role: 'role'
  };

  constructor(private http: Http) {}

  /*
    Post service to log in user

   */
  logIn(username: string, body: Object): Observable<User> {
    const bodyString = JSON.stringify(body);
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.post(`${environment.apiBase}/auth/` + username, bodyString, options)
      .map((response: Response) => LogInService.fromResponse(response));
  }

  /*
    Handle response by mapping data

   */
  private static fromResponse(response: Response): User {
    return User.getInstance(response.json());
  }
}
