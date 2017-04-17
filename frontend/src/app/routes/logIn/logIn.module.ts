import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { LogInComponent } from './logIn/logIn.component';

const routes: Routes = [
  { path: '', component: LogInComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  declarations: [
    LogInComponent
  ],
  exports: [
    RouterModule
  ]
})
export class LogInModule {}
