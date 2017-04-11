import {LayoutComponent} from '../layout/layout.component';

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'inicio', pathMatch: 'full'},
      {path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule'},
      {path: 'servicios', loadChildren: './servicios/servicios.module#ServiciosModule'}
    ]
  },

  // Not found
  {path: '**', redirectTo: 'inicio'}
];
