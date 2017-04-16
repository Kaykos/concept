import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
];

@NgModule({
  imports: [
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
