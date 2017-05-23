import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EventsComponent } from './events/events.component';

import { SharedModule } from '../../shared/shared.module';

import { CalendarComponent } from "ap-angular2-fullcalendar";

import { Ng2ImageGalleryModule } from "ng2-image-gallery";


const routes: Routes = [
  { path: '', component: EventsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    Ng2ImageGalleryModule
  ],
  declarations: [
    EventsComponent,
    CalendarComponent
  ],
  exports: [
    RouterModule
  ]
})
export class EventsModule {}
