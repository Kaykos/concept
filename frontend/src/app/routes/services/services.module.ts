import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PaginationModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { Ng2TableModule } from 'ng2-table';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { AgmCoreModule } from 'angular2-google-maps/core';

import { SharedModule } from '../../shared/shared.module';

import { ListServicesComponent } from './listServices/listServices.component';

const routes: Routes = [
  { path: '', component: ListServicesComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    PaginationModule,
    TabsModule,
    Ng2TableModule,
    Ng2Bs3ModalModule,
    CurrencyMaskModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCz07i-n1MX1iYJTht9fJ82J8n-d1Kneuc'
    }),
    SharedModule
  ],
  declarations: [
    ListServicesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ServicesModule {}
