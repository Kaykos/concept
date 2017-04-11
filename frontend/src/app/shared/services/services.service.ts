import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {PropsMapping} from './model.service';

import {Service} from '../models/service.model';

@Injectable()
export class ServicesService{
  static propsMapping: PropsMapping = {
    id: 'id',
    cost: 'cost',
    description: 'description'
  };

  constructor(private http: Http){}

  search(params?: URLSearchParams): Observable<Service[]>{
    let options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'}),
      search: params
    });
    return this.http.get(`${environment.apiBase}/services`, options)
      .map((response: Response) => ServicesService.fromResponse(response));
  }

  private static fromResponse(response: Response): Service[]{
    let propsMapping: PropsMapping = ServicesService.propsMapping;

    let list: Service[] = [];
    for(let data of response.json()){
      let model = new Service();
      for(let prop in propsMapping){
        model[prop] = data[propsMapping[prop]];
      }
      list.push(model);
    }
    return list;
  }
}
