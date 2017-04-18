import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Service } from '../models/service.model';

@Injectable()
export class ServicesService {
  constructor(private http: Http) {}

  /*
    Get service to obtain service data

   */
  search(route: string): Observable<Service[]>{
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.get(`${environment.apiBase}` + route, options)
      .map((response: Response) => ServicesService.fromResponseSearch(response));
  }

  /*
   Handle response by mapping data

   */
  private static fromResponseSearch(response: Response): Service[] {
    const listService: Service[] = [];
    for(const service of response.json()){
      listService.push(Service.getInstance(service));
    }
    return listService;
  }

  /*
   Post service to add service

   */
  add(userId: number, body: Object): Observable<Service> {
    const bodyString = JSON.stringify(body);
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.post(`${environment.apiBase}/users/` + userId.toString() + '/services', bodyString, options)
      .map((response: Response) => ServicesService.fromResponseAdd(response));
  }

  /*
   Handle response by mapping data

   */
  private static fromResponseAdd(response: Response): Service {
    return Service.getInstance(response.json());
  }

  /*
   Put service to update user information

   */
  update(userId: number, serviceId: number, body: Object): Observable<Service> {
    const bodyString = JSON.stringify(body);
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.put(`${environment.apiBase}/users/` + userId.toString() + '/services/' + serviceId.toString(), bodyString, options)
      .map((response: Response) => ServicesService.fromResponseUpdate(response));
  }

  /*
   Handle response by mapping data

   */
  private static fromResponseUpdate(response: Response): Service {
    return Service.getInstance(response.json());
  }

  /*
   Delete service of service

   */
  delete(userId: number, serviceId: number) {
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.delete(`${environment.apiBase}/users/` + userId.toString() + '/services/' + serviceId.toString(), options)
      .map((response: Response) => { return response; });
  }
}
