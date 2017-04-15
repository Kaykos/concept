import {LayoutComponent} from '../layout/layout.component';

import {CanActivateRouteService} from '../shared/services/can-activate-route.service';

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'logIn', pathMatch: 'full'},
      {path: 'logIn', loadChildren: './logIn/logIn.module#LogInModule'},
      {path: 'register', loadChildren: './register/register.module#RegisterModule'},
      /*
        Check if user is logged in

       */
      {path: 'logOut', loadChildren: './logOut/logOut.module#LogOutModule'},
      {
        path: 'events',
        canActivate: [CanActivateRouteService],
        loadChildren: './events/events.module#EventsModule'
      },
      {path: 'services', loadChildren: './services/services.module#ServicesModule'}
    ]
  },

  {path: '**', redirectTo: 'logIn'}
];
