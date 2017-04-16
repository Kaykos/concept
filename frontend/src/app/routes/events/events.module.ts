import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {EventsComponent} from './events/events.component';

import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: EventsComponent},
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    EventsComponent
  ],
  exports: [
    RouterModule
  ]
})
export class EventsModule {}
