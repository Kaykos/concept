import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {LogOutComponent} from './logOut/logOut.component';

const routes: Routes = [
  {path: '', component: LogOutComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LogOutComponent
  ],
  exports: [
    RouterModule
  ]
})
export class LogOutModule {}
