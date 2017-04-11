import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {PropsMapping} from './model.service';

import {Servicio} from '../models/servicio.model';

@Injectable()
export class ServiciosService{
  static propsMapping: PropsMapping = {
    id: 'id',
    numeroParticipaciones: 'numero_participaciones',
    numeroSorteos: 'numero_sorteos',
    numeroSorteosJugados: 'numero_sorteos_jugados',
    fechaHora: 'fecha_hora',
    estado: 'estado'
  };

  constructor(private http: Http){}

  search(usuarioId: number, params?: URLSearchParams): Observable<Servicio[]>{
    let options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'}),
      search: params
    });
    return this.http.get(`http://localhost:8080/usuarios/${usuarioId}/suscripciones`, options)
      .map((response: Response) => ServiciosService.fromResponse(response));
  }

  private static fromResponse(response: Response): Servicio[]{
    let propsMapping: PropsMapping = ServiciosService.propsMapping;

    let list: Servicio[] = [];
    for(let data of response.json()){
      let model = new Servicio();
      for(let prop in propsMapping){
        model[prop] = data[propsMapping[prop]];
      }
      list.push(model);
    }
    return list;
  }
}
