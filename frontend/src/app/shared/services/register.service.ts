import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {PropsMapping} from './model.service';

import {User} from '../models/user.model';

@Injectable()
export class RegisterService {
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
   Post service to register user

   */
  register(body: Object): Observable<User> {
    const bodyString = JSON.stringify(body);
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.post(`${environment.apiBase}/users`, bodyString, options)
      .map((response: Response) => RegisterService.fromResponse(response));
  }

  /*
   Handle response by mapping data

   */
  private static fromResponse(response: Response): User {
    const propsMapping: PropsMapping = RegisterService.propsMapping;
    const user = new User();
    for(const prop in propsMapping) {
      user[prop] = response.json()[propsMapping[prop]];
    }
    return user;
  }
}
