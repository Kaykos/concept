import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {EventsComponent} from './events/events.component';

const routes: Routes = [
  {path: '', component: EventsComponent},
];

@NgModule({
  imports: [
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
