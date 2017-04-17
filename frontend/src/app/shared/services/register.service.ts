import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';

@Injectable()
export class RegisterService {

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
    return User.getInstance(response.json());
  }
}
