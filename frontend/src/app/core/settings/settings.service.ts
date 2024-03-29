import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class SettingsService {
  private app: any;
  public layout: any;

  constructor() {
    // App Settings
    // -----------------------------------
    this.app = {
      name: 'Concept',
      company: 'SCAMS',
      description: 'Events Platform',
      year: ((new Date()).getFullYear())
    };

    // Layout Settings
    // -----------------------------------
    this.layout = {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null,
      asideScrollbar: false,
      isCollapsedText: false,
      useFullLayout: false,
      hiddenFooter: false,
      offsidebarOpen: false,
      asideToggled: false,
      viewAnimation: 'ng-fadeInUp'
    };
  }

  getAppSetting(name) {
    return name ? this.app[name] : this.app;
  }
  getLayoutSetting(name) {
    return name ? this.layout[name] : this.layout;
  }

  setAppSetting(name, value) {
    if (typeof this.app[name] !== 'undefined') {
      this.app[name] = value;
    }
  }
  setLayoutSetting(name, value) {
    if (typeof this.layout[name] !== 'undefined') {
      return this.layout[name] = value;
    }
  }
}
