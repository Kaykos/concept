import { Component, OnInit, ViewChild } from '@angular/core';

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
export class ListServicesComponent implements OnInit {
  private user: User;
  private service: Service;
  private services: Service[];

  private nameError: boolean;
  private costError: boolean;
  private descriptionError: boolean;
  private addressError: boolean;
  private phoneError: boolean;
  private formatError: boolean;

  private errorAdd: boolean;
  private errorDelete: boolean;
  private errorUpdate: boolean;
  private errorMessage: string;

  private fieldsChanged: boolean;

  private updateService: boolean;

  private latitude1: number;
  private longitude1: number;
  private latitude2: number;
  private longitude2: number;

  private imageData: string;
  private extension: string;
  private imageName: string;

  @ViewChild('modal1') modal1;
  @ViewChild('modal2') modal2;
  @ViewChild('map1') map1;
  @ViewChild('map2') map2;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Nombre', name: 'name', className: 'col-md-6'},
    {title: 'Costo ($)', name: 'cost', className: 'col-md-8'},
    {title: 'Valoración', name: 'rating', className: 'col-md-10'},
    {title: '', name: 'viewButton', className: 'col-md-1'}
  ];
  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  private data: Array<any>;

  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  public constructor(private servicesService: ServicesService, private authService: AuthService) {
    this.service = new Service();
    this.services = [];
  }

  public ngOnInit(): void {
    this.init();
  }

  /*
    Set initial flag values as false
    Require path to ask for services

   */
  init() {
    let parameters;
    this.initFlags();
    this.user = this.authService.getCurrentUser();
    parameters = '/services';
    if(this.user.role == 'proveedor') {
      parameters = '/users/' + this.user.id.toString() + '/services';
    }
    this.servicesService.search(parameters)
      .subscribe(
        (services)  => { this.handleServices(services); });
    this.updateService = false;
  }

  /*
   Initialize error and update flags

   */
  initFlags() {
    this.nameError = false;
    this.costError = false;
    this.descriptionError = false;
    this.addressError = false;
    this.phoneError = false;
    this.formatError = false;
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
    this.data = this.services.slice(0, this.services.length);
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
      this.service = this.services[this.services.indexOf(this.services.find(item => item.id == Service.getInstance(data.row).id))];
      this.updateService = false;
      this.fieldsChanged = false;
      this.imageData = '';
      this.extension = '';
      this.imageName = '';
      this.modal2.open().then( done => {
        if(this.map2) {
          this.map2.triggerResize().then( done => { this.latitude2 = this.service.latitude; this.longitude2 = this.service.longitude;} )
        }
      });
    }
  }

  private extendData() {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].viewButton = this.viewButton(this.data[i].viewButton);
    }
  }

  private viewButton(viewButton: any) {
    viewButton = '<span class=\"fa fa-search\"></span>';
    return viewButton;
  }

  /*
   Open modal 1

   */
  newService() {
    this.modal1.open().then(done => {
      if(this.map1) {
        this.map1.triggerResize().then( done => { this.latitude1 = 4.710989; this.longitude1 = -74.072092; } )
      }
    });
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
    this.fieldsChanged = false;
    this.imageData = '';
    this.extension = '';
    this.imageName = '';
  }

  /*
    Request server to add a service
    Validate required fields

   */
  add(name, description, cost, address, phone, type) {
    let flag = false;
    let dictionary = {};
    this.initFlags();
    if(name.value == '') {
      this.nameError = true;
      flag = true;
    }
    if(description.value == '') {
      this.descriptionError = true;
      flag = true;
    }
    if(cost.value <= 0) {
      this.costError = true;
      flag = true;
    }
    if(address.value == '') {
      this.addressError = true;
      flag = true;
    }
    if(phone.value == '') {
      this.phoneError = true;
      flag = true;
    }
    if(flag) {
      return;
    }
    dictionary['name'] = name.value;
    dictionary['description'] = description.value;
    dictionary['cost'] = cost.value;
    dictionary['type'] = type.value.toLowerCase();
    dictionary['address'] = address.value;
    dictionary['phone'] = phone.value;
    if(type.value == 'Establecimiento') {
      dictionary['latitude'] = this.latitude1;
      dictionary['longitude'] = this.longitude1;
    }
    if(this.imageData != '' && this.extension != '') {
      dictionary['image_data'] = this.imageData;
      dictionary['extension'] = this.extension;
    }
    this.servicesService.add(this.user.id, dictionary)
      .subscribe(
        (service: Service) => { location.reload(); },
        (error) => { this.handleErrorAdd(error); });
    name.value = null;
    description.value = null;
    cost.value = null;
    address.value = null;
    phone.value = null;
    type.value = 'Establecimiento';
    this.latitude1 = 4.710989;
    this.longitude1 = -74.072092;
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
  updateFields(name: string, description: string, cost: number, address: string, phone: string) {
    let dictionary = {};
    this.initFlags();
    if(this.service.name == name && this.service.description == description && this.service.cost == cost && this.service.address == address && this.service.phone == phone && this.imageData == '' && this.extension == '') {
      this.errorUpdate = true;
      return;
    }
    if(this.service.name != name) {
      dictionary['name'] = name;
    }
    if(this.service.description != description) {
      dictionary['description'] = description;
    }
    if(this.service.cost != cost) {
      dictionary['cost'] = cost;
    }
    if(this.service.address != address) {
      dictionary['address'] = address;
    }
    if(this.service.phone != phone) {
      dictionary['phone'] = phone;
    }
    if(this.imageData != '' && this.extension != '') {
      dictionary['image_data'] = this.imageData;
      dictionary['extension'] = this.extension;
    }
    this.servicesService.update(this.user.id, this.service.id, dictionary)
      .subscribe(
        (service: Service)  => { this.manageUpdate(service) },
        (error) => { this.handleErrorUpdate(error); });
    this.imageData = '';
    this.extension = '';
    this.imageName = '';
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
    this.handleServices(this.services);
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
        (success)  => { location.reload(); },
        (error) => { this.handleErrorDelete(error); });
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
    this.latitude1 = $event.coords.lat;
    this.longitude1 = $event.coords.lng;
  }

  /*
    Listen to file uploader event

   */
  changeListener(event) {
    var files = event.target.files;
    var file = files[0];
    var extension;
    this.extension = '';
    this.imageData = '';
    this.imageName = '';
    this.formatError = false;
    if(files && file) {
      extension = file.name.match(/\.(.+)$/)[1].toLowerCase();
      if(extension == 'jpg' || extension == 'jpeg' || extension == 'png') {
        this.extension = extension;
        var reader = new FileReader();
        reader.onloadend = (e) => {
          this.imageData = reader.result;
          this.imageName = file.name;
        }
        reader.readAsDataURL(file);
      }
      else {
        this.imageData = '';
        this.formatError = true;
      }
    }
  }
}
