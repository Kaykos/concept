import {LayoutComponent} from '../layout/layout.component';

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'logIn', pathMatch: 'full'},
      {path: 'logIn', loadChildren: './logIn/logIn.module#LogInModule'},
      {path: 'register', loadChildren: './register/register.module#RegisterModule'},
      {path: 'services', loadChildren: './services/services.module#ServicesModule'}
    ]
  },

  {path: '**', redirectTo: 'logIn'}
];
