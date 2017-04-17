import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DataTableModule} from 'angular2-datatable';
import {Ng2TableModule} from 'ng2-table/ng2-table';

import {ListComponent} from './list/list.component';
import {GridServicesComponent} from './list/grid-services/grid-services.component';
import {ServiceComponent} from './service/service.component';

import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: ListComponent}
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    Ng2TableModule
  ],
  declarations: [
    ListComponent,
    GridServicesComponent,
    ServiceComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ServicesModule {}
