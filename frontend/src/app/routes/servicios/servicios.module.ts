import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataTableModule} from 'angular2-datatable';
import {Ng2TableModule} from 'ng2-table/ng2-table';

import {SharedModule} from '../../shared/shared.module';

import {StandardComponent} from './standard/standard.component';
import {ExtendedComponent} from './extended/extended.component';
import {ListaSuscripcionesComponent} from './extended/lista-suscripciones/lista-suscripciones.component';
import {ListaSorteosComponent} from './extended/lista-sorteos/lista-sorteos.component';

import {SuscripcionesService} from '../../shared/services/suscripciones.service';
import {SorteosService} from '../../shared/services/sorteos.service';

const routes: Routes = [
  {path: 'standard', component: StandardComponent},
  {path: 'extended', component: ExtendedComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    DataTableModule,
    Ng2TableModule
  ],
  declarations: [
    StandardComponent,
    ExtendedComponent,
    ListaSuscripcionesComponent,
    ListaSorteosComponent
  ],
  providers: [
    SuscripcionesService,
    SorteosService
  ],
  exports: [
    RouterModule
  ]
})
export class SuscripcionesModule{}
