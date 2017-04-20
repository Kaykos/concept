import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(private http: Http) {}

  /*
   Put service to update user information

   */
  update(id: number, body: Object): Observable<User> {
    const bodyString = JSON.stringify(body);
  const options = new RequestOptions({
    headers: new Headers({'Content-Type': 'application/json'})
  });
  return this.http.put(`${environment.apiBase}` + '/users/' + id.toString(), bodyString, options)
    .map((response: Response) => UsersService.fromResponse(response));
  }

  /*
   Handle response by mapping data

   */
  private static fromResponse(response: Response): User {
    return User.getInstance(response.json());
  }

  /*
   Delete service of user

   */
  delete(id: number) {
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.delete(`${environment.apiBase}` + '/users/' + id.toString(), options)
      .map((response: Response) => { return response; });
  }
}
