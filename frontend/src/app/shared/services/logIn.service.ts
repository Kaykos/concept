import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {PropsMapping} from './model.service';

import {User} from '../models/user.model';

@Injectable()
export class LogInService {
  static propsMapping: PropsMapping = {
    id: 'id',
    name: 'name',
    lastName: 'last_name',
    username: 'user_name',
    role: 'role'
  };

  constructor(private http: Http) {}

  logIn(username: string, body: Object): Observable<User> {
    const bodyString = JSON.stringify(body);
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.post(`${environment.apiBase}/auth/` + username, bodyString, options)
      .map((response: Response) => LogInService.fromResponse(response));
  }

  private static fromResponse(response: Response): User {
    const propsMapping: PropsMapping = LogInService.propsMapping;
    const user = new User();
    for(const prop in propsMapping) {
      user[prop] = response.json()[propsMapping[prop]];
    }
    return user;
  }
}
