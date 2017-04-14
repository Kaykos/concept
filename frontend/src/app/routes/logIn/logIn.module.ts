import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';

import {LogInComponent} from './logIn/logIn.component';

import {LogInService} from '../../shared/services/logIn.service';

const routes: Routes = [
  {path: '', component: LogInComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LogInComponent
  ],
  providers: [
    LogInService
  ],
  exports: [
    RouterModule
  ]
})
export class LogInModule {}
