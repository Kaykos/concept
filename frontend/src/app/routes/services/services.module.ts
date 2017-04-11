import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataTableModule} from 'angular2-datatable';
import {Ng2TableModule} from 'ng2-table/ng2-table';

import {SharedModule} from '../../shared/shared.module';

import {ListComponent} from './list/list.component';

import {ServicesService} from '../../shared/services/services.service';

const routes: Routes = [
  {path: '', component: ListComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    DataTableModule,
    Ng2TableModule
  ],
  declarations: [
    ListComponent
  ],
  providers: [
    ServicesService
  ],
  exports: [
    RouterModule
  ]
})
export class ServicesModule{}
