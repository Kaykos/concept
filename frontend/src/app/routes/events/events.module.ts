import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EventsComponent } from './events/events.component';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: EventsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  declarations: [
    EventsComponent
  ],
  exports: [
    RouterModule
  ]
})
export class EventsModule {}
