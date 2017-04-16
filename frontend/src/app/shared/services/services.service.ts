import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';

import {Service} from '../models/service.model';

@Injectable()
export class ServicesService {

  constructor(private http: Http) {}

  search(route: string): Observable<Service[]>{
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.get(`${environment.apiBase}` + route, options)
      .map((response: Response) => ServicesService.fromResponse(response));
  }

  private static fromResponse(response: Response): Service[] {
    const listService: Service[] = [];
    for(const service of response.json()){
      listService.push(Service.getInstance(service));
    }
    return listService;
  }
}
