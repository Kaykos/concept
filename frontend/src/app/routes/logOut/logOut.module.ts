import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';

import {LogOutComponent} from './logOut/logOut.component';

const routes: Routes = [
  {path: '', component: LogOutComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
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
