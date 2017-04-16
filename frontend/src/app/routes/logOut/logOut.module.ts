import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {LogOutComponent} from './logOut/logOut.component';

import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: LogOutComponent},
];

@NgModule({
  imports: [
    SharedModule,
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
