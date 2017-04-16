import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {RegisterComponent} from './register/register.component';

import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: RegisterComponent},
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterModule {}
