import {LayoutComponent} from '../layout/layout.component';

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'servicios', loadChildren: './servicios/servicios.module#ServiciosModule'}
    ]
  },

  // Not found
  {path: '**', redirectTo: 'home'}
];
