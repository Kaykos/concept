import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Event } from '../models/event.model';

@Injectable()
export class EventsService {
  constructor(private http: Http) {}

  /*
   Get service to obtain events

   */
  search(route: string): Observable<Event[]>{
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.get(`${environment.apiBase}` + route, options)
      .map((response: Response) => EventsService.fromResponseSearch(response));
  }

  /*
   Handle response by mapping data

   */
  private static fromResponseSearch(response: Response): Event[] {
    const listEvent: Event[] = [];
    for(const event of response.json()){
      listEvent.push(Event.getInstance(event));
    }
    return listEvent;
  }

  /*
   Post service to add event

   */
  add(userId: number, body: Object): Observable<Event> {
    const bodyString = JSON.stringify(body);
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.post(`${environment.apiBase}` + '/users/' + userId.toString() + '/events', bodyString, options)
      .map((response: Response) => EventsService.fromResponseAddUpdate(response));
  }

  /*
   Put service to update event information

   */
  update(userId: number, eventId: number, body: Object): Observable<Event> {
    const bodyString = JSON.stringify(body);
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.put(`${environment.apiBase}` + '/users/' + userId.toString() + '/events/' + eventId.toString(), bodyString, options)
      .map((response: Response) => EventsService.fromResponseAddUpdate(response));
  }

  /*
   Handle response by mapping data

   */
  private static fromResponseAddUpdate(response: Response): Event {
    return Event.getInstance(response.json());
  }

  /*
   Delete service of event

   */
  delete(userId: number, eventId: number) {
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this.http.delete(`${environment.apiBase}` + '/users/' + userId.toString() + '/events/' + eventId.toString(), options)
      .map((response: Response) => { return response; });
  }
}
