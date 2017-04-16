import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataTableModule} from 'angular2-datatable';
import {Ng2TableModule} from 'ng2-table/ng2-table';

import {ListComponent} from './list/list.component';
import {GridServicesComponent} from './list/grid-services/grid-services.component';

const routes: Routes = [
  {path: '', component: ListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    DataTableModule,
    Ng2TableModule
  ],
  declarations: [
    ListComponent,
    GridServicesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ServicesModule {}
