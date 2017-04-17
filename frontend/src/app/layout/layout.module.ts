import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserblockComponent } from './sidebar/userblock/userblock.component';
import { UserblockService } from './sidebar/userblock/userblock.service';
import { SidebarComponent } from './sidebar/sidebar.component';

import { SharedModule } from '../shared/shared.module';

import { AuthService } from '../shared/services/auth.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    UserblockService,
    AuthService
  ],
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    UserblockComponent,
    SidebarComponent
  ],
  exports: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    UserblockComponent,
    SidebarComponent
  ]
})
export class LayoutModule {}
