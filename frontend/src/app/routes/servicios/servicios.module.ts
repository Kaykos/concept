import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataTableModule} from 'angular2-datatable';
import {Ng2TableModule} from 'ng2-table/ng2-table';

import {SharedModule} from '../../shared/shared.module';

import {ListaComponent} from './lista/lista.component';

import {ServiciosService} from '../../shared/services/servicios.service';

const routes: Routes = [
  {path: '', component: ListaComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    DataTableModule,
    Ng2TableModule
  ],
  declarations: [
    ListaComponent
  ],
  providers: [
    ServiciosService
  ],
  exports: [
    RouterModule
  ]
})
export class ServiciosModule{}
