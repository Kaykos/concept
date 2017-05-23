import { Component, OnInit, ViewChild } from '@angular/core';

import { CalendarComponent } from "ap-angular2-fullcalendar";

import { User } from "app/shared/models/user.model";
import { Event } from "app/shared/models/event.model";
import { Service } from "../../../shared/models/service.model";

import { EventsService } from "../../../shared/services/events.service";
import { ServicesService } from "../../../shared/services/services.service";
import { AuthService } from "../../../shared/services/auth.service";

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
  private services: Service[];
  private establishemntList: Service[];
  private foodList: Service[];
  private musicList: Service[];

  private eventImages: string[];

  constructor(private eventsService: EventsService, private servicesService: ServicesService, private authService: AuthService) {
    this.establishemntList = [];
    this.foodList = [];
    this.musicList = [];
    this.eventImages = [];
  }

  public ngOnInit() {
    var parameters;
    this.user = this.authService.getCurrentUser();
    parameters = 'users/' + this.user.id + '/events';
    if(this.user.role == 'admin') {
      parameters = '/events';
    }
    this.eventsService.searchEvents(parameters)
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
      event['backgroundColor'] = '#6D0913';
      event['borderColor'] = '#6D0913';
      this.myCalendar.fullCalendar('renderEvent', event, 'stick');
    }
  }

  calendarOptions: Object = {
    header: {
      left: 'title',
      center: '',
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

  /*
    Display modal for adding a new event

   */
  handleDayClickEvent(date) {
    var parameters;
    this.modal1.open();
    parameters = '/services/ubicacion';
    this.servicesService.search(parameters)
      .subscribe(
        services  => { this.establishemntList = services; });
    parameters = '/services/comida';
    this.servicesService.search(parameters)
      .subscribe(
        services  => { this.foodList = services; });
    parameters = '/services/musica';
    this.servicesService.search(parameters)
      .subscribe(
        services  => { this.musicList = services; });
  }

  /*
    Store all image data of services associated to selected event
    Opens modal 2

   */
  handleSearchEvent(services) {
    this.services = services;
    for(let i = 0; i < this.services.length; i++) {
      console.log(this.services[i].name);
      this.eventImages[i] = this.services[i].serviceImage;
    }
    this.modal2.open();
  }

  /*
    Manager, when an event is selected
    Ask for services associated to event

   */
  handleEventClickEvent(id) {
    var parameters;
    let instance = this.events.find(item => item.id == id);
    let index = this.events.indexOf(instance);
    this.event = this.events[index];
    this.eventImages.length = 0;
    parameters = '/events/' + id + '/services';
    this.eventsService.searchEvent(parameters)
      .subscribe(
        services  => { this.handleSearchEvent(services); });
  }
}
