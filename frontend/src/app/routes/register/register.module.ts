import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';

import {RegisterComponent} from './register/register.component';

import {RegisterService} from '../../shared/services/register.service';

const routes: Routes = [
  {path: '', component: RegisterComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterComponent],
  providers: [
    RegisterService
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterModule{}
