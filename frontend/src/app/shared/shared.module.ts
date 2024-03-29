import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';

import { AccordionModule } from 'ng2-bootstrap/accordion';
import { AlertModule } from 'ng2-bootstrap/alert';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { RatingModule } from 'ng2-bootstrap/rating';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { TooltipModule } from 'ng2-bootstrap/tooltip';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { FlotDirective } from './directives/flot/flot.directive';
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { ColorsService } from './colors/colors.service';
import { CheckallDirective } from './directives/checkall/checkall.directive';
import { VectormapDirective } from './directives/vectormap/vectormap.directive';
import { NowDirective } from './directives/now/now.directive';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { JqcloudDirective } from './directives/jqcloud/jqcloud.directive';

import { CanActivateRouteService } from './services/can-activate-route.service';
import { EventsService } from './services/events.service';
import { LogInService } from './services/logIn.service';
import { RegisterService } from './services/register.service';
import { ServicesService } from './services/services.service';
import { UsersService } from 'app/shared/services/users.service';

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    DatepickerModule.forRoot(),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToasterModule,
    Ng2Bs3ModalModule
  ],
  providers: [
    ColorsService,
    CanActivateRouteService,
    EventsService,
    LogInService,
    RegisterService,
    ServicesService,
    UsersService
  ],
  declarations: [
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CarouselModule,
    CollapseModule,
    DatepickerModule,
    DropdownModule,
    ModalModule,
    PaginationModule,
    ProgressbarModule,
    RatingModule,
    TabsModule,
    TimepickerModule,
    TooltipModule,
    TypeaheadModule,
    ToasterModule,
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    Ng2Bs3ModalModule,
  ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
