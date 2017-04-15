import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';

import {EventsComponent} from './events/events.component';

import { AgmCoreModule } from "angular2-google-maps/core";

const routes: Routes = [
  {path: '', component: EventsComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot()
  ],
  declarations: [EventsComponent],
  exports: [
    RouterModule
  ]
})
export class EventsModule {}
