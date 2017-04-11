import {LayoutComponent} from '../layout/layout.component';

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'services', loadChildren: './services/services.module#ServicesModule'}
    ]
  },

  {path: '**', redirectTo: 'home'}
];
