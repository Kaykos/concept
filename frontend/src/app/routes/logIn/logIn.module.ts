import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {LogInComponent} from './logIn/logIn.component';

import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: LogInComponent},
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LogInComponent
  ],
  exports: [
    RouterModule
  ]
})
export class LogInModule {}
