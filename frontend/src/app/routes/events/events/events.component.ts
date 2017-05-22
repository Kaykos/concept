import { Component, OnInit, ViewChild } from '@angular/core';

import { CalendarComponent } from "ap-angular2-fullcalendar";

import { User } from "app/shared/models/user.model";
import { Event } from "app/shared/models/event.model";

import { AuthService } from "../../../shared/services/auth.service";
import { EventsService } from "../../../shared/services/events.service";

import 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  @ViewChild('modal1') modal1;
  @ViewChild('modal2') modal2;

  private user: User;
  private event: Event;
  private events: Event[];

  private parameters: string;

  constructor(private eventsService: EventsService, private authService: AuthService) { }

  public ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.parameters = '/events';
    this.eventsService.search(this.parameters)
      .subscribe(
        events  => { this.handleEvents(events); });
  }

  /*
   Asign events to calendar

   */
  handleEvents(events) {
    this.events = events;
    var event = {};
    for(let i = 0; i < events.length; i++) {
      event['id'] = events[i].id;
      event['title'] = events[i].title;
      event['start'] = events[i].date;
      if(events[i].clientId == this.user.id) {
        event['backgroundColor'] = '#6D0913';
        event['borderColor'] = '#6D0913';
      }
      else {
        event['backgroundColor'] = '#9C0D1B';
        event['borderColor'] = '#9C0D1B';
      }
      this.myCalendar.fullCalendar('renderEvent', event, 'stick');
    }
  }

  calendarOptions: Object = {
    header: {
      left: '',
      center: 'title',
      right: 'prev, next'
    },
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lune','Martes','Miércoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
    buttonText: {
      prev: '‹',
      next: '›',
      today: 'hoy'
    },
    dayClick: (date) => {
      this.handleDayClickEvent(date);
    },
    eventClick: (event) => {
      this.handleEventClickEvent(event.id);
    }
  };

  handleDayClickEvent(date) {
    this.modal1.open();
  }

  handleEventClickEvent(id) {
    let instance = this.events.find(item => item.id == id);
    let index = this.events.indexOf(instance);
    this.event = this.events[index];
    this.modal2.open();
  }
}
