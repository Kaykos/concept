import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {UsersComponent} from './users/users.component';

import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: UsersComponent},
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UsersComponent
  ],
  exports: [
    RouterModule
  ]
})
export class UsersModule {}
