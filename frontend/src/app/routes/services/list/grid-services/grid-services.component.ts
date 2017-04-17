import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../shared/services/auth.service';
import { ServicesService } from 'app/shared/services/services.service';

import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'grid-services',
  templateUrl: './grid-services.component.html',
  styleUrls: ['./grid-services.component.scss']
})
export class GridServicesComponent implements OnInit {
  private user: User;
  private param: string;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Nombre', name: 'name', filtering: {filterString: '', placeholder: 'Filtrar por nombre'}},
    {title: 'Descripción', name: 'description'},
    {title: 'Costo ($)', name: 'cost'},
    {title: 'Valoración', name: 'rating'},
    {title: '', name: 'viewbutton'}
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

  public constructor(private servicesService: ServicesService, private authService: AuthService) {
    this.user = new User();
  }

  /*
    Get current user and ask for services depending on role.
    Guest, client -> Location services
    Provider -> Own services
    Admin -> All services

   */
  public ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user === null) {
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
        this.param = '/services/location';
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
  }

  /*
    Asign table data as requested services

   */
  handleServices(service) {
    this.data = service;
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

  public onCellClick(data: any): any {
  }

  private extendData() {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].viewbutton = this.viewbutton(this.data[i].viewbutton);
    }
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].rating = this.rating(this.data[i].rating);
    }
  }

  private viewbutton(viewbutton: string) {
    viewbutton = '<button _ngcontent-tiv-101="" class="btn btn-primary" type="button"><span class="fa fa-search"></span></button>';
    return viewbutton;
  }

  private rating(value: string) {
    let template = '';
    for (let i = 0; i < +value; i++) {
      template += '<span class="fa fa-star"></span>';
    }
    return template;
  }
}
