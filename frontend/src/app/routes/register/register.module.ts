import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterModule {}
