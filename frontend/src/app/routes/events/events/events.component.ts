import { Component, OnInit, ViewChild } from '@angular/core';

import { CalendarComponent } from "ap-angular2-fullcalendar";

import { User } from "app/shared/models/user.model";
import { Event } from "app/shared/models/event.model";
import { Service } from "app/shared/models/service.model";

import { AuthService } from "../../../shared/services/auth.service";
import { ServicesService } from "../../../shared/services/services.service";
import { EventsService } from "../../../shared/services/events.service";

import { ImageInterface } from "ng2-image-gallery/dist/src/ng2-image-gallery.component";

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

  private titleError: boolean;

  private actualDate: string;

  private user: User;
  private event: Event;
  private events: Event[];
  private services: Service[];
  private establishmentList: Service[];
  private foodList: Service[];
  private musicList: Service[];
  private selectedServices: Service[];

  private eventImages: ImageInterface[];

  private totalCost: number;

  constructor(private eventsService: EventsService, private servicesService: ServicesService, private authService: AuthService) {
    this.titleError = false;
    this.events = [];
    this.services = [];
    this.establishmentList = [];
    this.foodList = [];
    this.musicList = [];
    this.selectedServices = [];
    this.eventImages = [];
    this.totalCost = 0;
  }

  public ngOnInit() {
    let parameters;
    this.user = this.authService.getCurrentUser();
    parameters = '/users/' + this.user.id + '/events';
    if(this.user.role == 'admin') {
      parameters = '/events';
    }
    this.eventsService.searchEvents(parameters)
      .subscribe(
        (events)  => { this.handleEvents(events); });
  }

  /*
    Asign events to calendar

   */
  handleEvents(events) {
    let event = {};
    this.events = events;
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
    Stores services grouped by type

   */
  handleSearchEvents(services) {
    this.services = services;
    for(let i = 0; i < this.services.length; i++) {
      switch(this.services[i].type) {
        case 'establecimiento':
          this.establishmentList.push(this.services[i]);
          break;
        case 'comida':
          this.foodList.push(this.services[i]);
          break;
        case 'música':
          this.musicList.push(this.services[i]);
          break;
      }
    }
  }

  /*
    Display modal for adding a new event

   */
  handleDayClickEvent(date) {
    let parameters: string;
    if(this.user.role != 'proveedor') {
      this.titleError = false;
      this.totalCost = 0;
      this.establishmentList = [];
      this.foodList = [];
      this.musicList = [];
      this.actualDate = date.format();
      parameters = '/services/'+this.actualDate;
      this.servicesService.search(parameters)
        .subscribe(
          services  => { this.handleSearchEvents(services) });
      this.modal1.open();
    }
  }

  /*
    Stores all image data of services associated to selected event
    Opens modal 2

   */
  handleSearchEvent(services) {
    let image: ImageInterface;
    this.services = services;
    for(let i = 0; i < this.services.length; i++) {
      image = new Image();
      image.thumbnail = this.services[i].serviceImage;
      image.text = this.services[i].name;
      image.image = this.services[i].serviceImage;
      this.eventImages.push(image);
    }
    this.modal2.open();
  }

  /*
    Handle actions when an event is selected
    Ask for services associated to event

   */
  handleEventClickEvent(id) {
    var parameters;
    let instance = this.events.find(item => item.id == id);
    let index = this.events.indexOf(instance);
    this.event = this.events[index];
    this.eventImages = [];
    parameters = '/events/' + id + '/services';
    this.eventsService.searchEvent(parameters)
      .subscribe(
        services  => { this.handleSearchEvent(services); });
  }

  /*
    Handle actions when an establishment is selected

   */
  selectedRadioButton(event, establishment) {
    let instance =  this.services.find(item => item.type == 'establecimiento');
    if(instance) {
      let index = this.selectedServices.indexOf(instance);
      this.selectedServices.splice(index, 1);
    }
    this.selectedServices.push(establishment);
    this.updateCost();
  }

  /*
    Handle actions when a food service is selected

   */
  selectedCheckBoxFood(event, food) {
    if(event.target.checked) {
      this.selectedServices.push(food);
    }
    else {
      let index = this.selectedServices.indexOf(food);
      this.selectedServices.splice(index, 1);
    }
    this.updateCost();
  }

  /*
   Handle actions when a music service is selected

   */
  selectedCheckBoxMusic(event, music) {
    if(event.target.checked) {
      this.selectedServices.push(music);
    }
    else {
      let index = this.selectedServices.indexOf(music);
      this.selectedServices.splice(index, 1);
    }
    this.updateCost();
  }

  /*
    Updates actual cost by adding establishment, food and music costs

   */
  updateCost() {
    this.totalCost = 0;
    for(let i = 0; i < this.selectedServices.length; i++) {
      this.totalCost += this.selectedServices[i].cost;
    }
  }

  /*
    Adds a new event to calendar

   */
  manageAdd(newEvent) {
    var event = {};
    event['id'] = newEvent.id;
    event['title'] = newEvent.title;
    event['start'] = newEvent.date;
    event['backgroundColor'] = '#6D0913';
    event['borderColor'] = '#6D0913';
    this.myCalendar.fullCalendar('renderEvent', event, 'stick');
    location.reload();
  }

  /*
    Adds a new event

   */
  newEvent(titleAdd) {
    var dictionary = {};
    var servicesId: number[] = [];
    this.titleError = false;
    if(titleAdd.value == '') {
      this.titleError = true;
      return;
    }
    dictionary['title'] = titleAdd.value;
    dictionary['date'] = this.actualDate;
    dictionary['client_id'] = this.user.id;
    dictionary['cost'] = this.totalCost;
    for(let i = 0; i < this.selectedServices.length; i++) {
      servicesId.push(this.selectedServices[i].id);
    }
    dictionary['services'] = servicesId;
    this.eventsService.add(this.user.id, dictionary)
      .subscribe(
        (event: Event) => { this.manageAdd(event); });
    titleAdd.value = null;
  }

  /*
    Deletes an event

   */
  delete() {
    this.eventsService.delete(this.user.id, this.event.id)
      .subscribe(
        (success)  => { location.reload(); });
  }
}
