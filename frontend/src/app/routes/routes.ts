import { LayoutComponent } from '../layout/layout.component';

import { CanActivateRouteService } from '../shared/services/can-activate-route.service';

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'logIn', pathMatch: 'full'},
      /*
       Check if user is logged in

       */
      {
        path: 'events',
        canActivate: [CanActivateRouteService],
        loadChildren: './events/events.module#EventsModule'
      },
      {path: 'logIn', loadChildren: './logIn/logIn.module#LogInModule'},
      {path: 'logOut', loadChildren: './logOut/logOut.module#LogOutModule'},
      {path: 'register', loadChildren: './register/register.module#RegisterModule'},
      {path: 'services', loadChildren: './services/services.module#ServicesModule'},
      {path: 'users', loadChildren: './users/users.module#UsersModule'}
    ]
  },

  {path: '**', redirectTo: 'logIn'}
];
