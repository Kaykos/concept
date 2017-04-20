import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { ServicesService } from 'app/shared/services/services.service';

import { User } from '../../../shared/models/user.model';
import { Service } from '../../../shared/models/service.model';

import 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-listServices',
  templateUrl: './listServices.component.html',
  styleUrls: ['./listServices.component.scss']
})
export class ListServicesComponent implements OnInit, OnChanges {
  private user: User;
  private service: Service;
  private services: Service[];
  private param: string;
  private showMap1: boolean;
  private showMap2: boolean;
  private picturePath: string;
  private stars: Array<string>;

  private nameError: boolean;
  private costError: boolean;
  private descriptionError: boolean;

  private errorAdd: boolean;
  private errorDelete: boolean;
  private errorUpdate: boolean;
  private errorMessage: string;

  private updateService: boolean;
  private fieldsChanged: boolean;

  private latitude: number;
  private longitude: number;

  @ViewChild('modal1') modal1;
  @ViewChild('modal2') modal2;
  @ViewChild('map1') map1;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Nombre', name: 'name'},
    {title: 'Costo ($)', name: 'cost'},
    {title: 'Valoración', name: 'rating'},
    {title: '', name: 'viewButton'}
  ];
  public page = 1;
  public itemsPerPage = 5;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data: Array<any>;

  public constructor(private servicesService: ServicesService, private authService: AuthService, private router: Router) {
    this.user = new User();
    this.service = new Service();
    this.stars = new Array<string>();
  }

  public ngOnInit(): void {
    this.init();
  }

  /*
    Recalculate table when data is changed

   */
  ngOnChanges() {
    this.data = this.services;
    this.length = this.data.length;
    this.extendData();
    this.onChangeTable(this.config);
  }

  /*
    Set initial variables
    Require path to ask for services
    Set initial flag values as false

   */
  init() {
    this.initFlags();
    this.latitude = 4.710989;
    this.longitude = -74.072092;
    this.user = this.authService.getCurrentUser();
    if (this.user == null) {
      this.user = {
        id: 0,
        name: 'Invitado',
        lastName: '',
        email: '',
        username: '',
        role: 'invitado'
      };
    }
    switch (this.user.role) {
      case 'invitado':
      case 'cliente':
        this.param = '/services/locacion';
        break;
      case 'proveedor':
        this.param = '/users/' + this.user.id.toString() + '/services';
        break;
      case 'admin':
        this.param = '/services';
        break;
    }
    this.servicesService.search(this.param)
      .subscribe(
        service  => { this.handleServices(service); });
    this.showMap1 = false;
    this.showMap2 = false;
    this.picturePath = '';
    this.updateService = false;
  }

  /*
   Initialize error and update flags

   */
  initFlags() {
    this.nameError = false;
    this.costError = false;
    this.descriptionError = false;
    this.errorAdd = false;
    this.errorDelete = false;
    this.errorUpdate = false;
    this.errorMessage = '';
    this.fieldsChanged = false;
  }

  /*
   Asign table data as requested services

   */
  handleServices(services) {
    this.services = services;
    this.data = this.services;
    this.length = this.data.length;
    this.extendData();
    this.onChangeTable(this.config);
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  /*
   Open modal 2
   Update service data

   */
  public onCellClick(data: any): any {
    if (data.column == "viewButton") {
      this.service = Service.getInstance(data.row);
      if (this.service.id > 0 && this.service.id < 6) {
        this.picturePath = '../../../assets/img/service/' + this.service.id + '.jpg';
      }
      else {
        this.picturePath = '../../../assets/img/service/0.png';
      }
      this.updateService = false;
      this.modal2.open();
      this.showMap1 = false;
      this.showMap2 = true;
    }
  }

  private extendData() {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].viewButton = this.viewButton(this.data[i].viewButton);
    }
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].rating = this.rating(this.data[i].rating);
    }
  }

  private viewButton(viewButton: string) {
    viewButton = '<span class=\"fa fa-search\"></span>';
    return viewButton;
  }

  private rating(value: string) {
    let template = '';
    for (let i = 0; i < +value; i++) {
      template += '<span class="fa fa-star"></span>';
    }
    return template;
  }

  /*
   Open modal 1

   */
  newService() {
    this.modal1.open();
    this.showMap2 = false;
    this.showMap1 = true;
  }

  /*
   Set modal as updater

   */
  update() {
    this.updateService = true;
  }

  /*
   Cancel modal as updater

   */
  back() {
    this.updateService = false;
  }

  /*
    Request server to add a service
    Validate required fields

   */
  add(name: string, description: string, cost: number, type: string) {
    this.initFlags();
    if (name == '') {
      this.nameError = true;
    }
    if (description == '') {
      this.descriptionError = true;
    }
    if (cost <= 0) {
      this.costError = true;
    }
    if (name == '' ||  description == '' || cost <= 0) {
      return;
    }
    if (type != 'locacion') {
      this.servicesService.add(this.user.id, {
        'name': name, 'description': description, 'cost': cost, 'type': type
      })
        .subscribe(
          (service: Service) => { this.manageAdd(service); },
          error => { this.handleErrorAdd(error); });
    }
    else {
      this.servicesService.add(this.user.id, {
        'name': name, 'description': description, 'cost': cost, 'type': type, 'latitude': this.latitude, 'longitude': this.longitude
      })
        .subscribe(
          (service: Service) => { this.manageAdd(service); },
          error => { this.handleErrorAdd(error); });
    }
  }

  /*
   Handle event when service is added

   */
  manageAdd(service) {
    this.services.push(service);
    this.modal1.close();
    this.ngOnChanges();
  }

  /*
   Show error message in page

   */
  handleErrorAdd(error: any) {
    this.initFlags();
    this.errorDelete = true;
    this.errorMessage = error.json().message;
  }

  /*
   Send request to update service
   Check if any field has been changed

   */
  updateFields(name: string, description: string, cost: number) {
    this.initFlags();
    if (this.service.name == name && this.service.description == description && this.service.cost == cost) {
      this.errorUpdate = true;
      return;
    }
    let content = {'name': name, 'description': description, 'cost': cost};
    this.servicesService.update(this.user.id, this.service.id, content)
      .subscribe(
        (service: Service)  => { this.manageUpdate(service) },
        error => this.handleErrorUpdate(error));
  }

  /*
   Handle events when fields are changed

   */
  manageUpdate(service: Service) {
    let instance =  this.services.find(item => item.id == this.service.id);
    let index = this.services.indexOf(instance);
    this.service = service;
    this.services[index] = this.service;
    this.fieldsChanged = true;
    this.ngOnChanges();
  }

  /*
   Show update error message in page

   */
  handleErrorUpdate(error: any) {
    this.initFlags();
    this.errorUpdate = true;
    this.errorMessage = error.json().message;
  }

  /*
   Send request to delete user

   */
  delete() {
    this.initFlags();
    this.servicesService.delete(this.user.id, this.service.id)
      .subscribe(
        success  => { this.manageDelete() },
        error => this.handleErrorDelete(error));
  }

  /*
   Handle events when user is deleted

   */
  manageDelete() {
    let instance =  this.services.find(item => item.id == this.service.id);
    let index = this.services.indexOf(instance);
    this.services.splice(index, 1);
    this.modal2.close();
    this.ngOnChanges();
  }

  /*
   Show email error message in page

   */
  handleErrorDelete(error: any) {
    this.initFlags();
    this.errorDelete = true;
    this.errorMessage = error.json().message;
  }

  /*
    Update marker latitude and longitude on click

   */
  handleClickMap($event) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }
}
