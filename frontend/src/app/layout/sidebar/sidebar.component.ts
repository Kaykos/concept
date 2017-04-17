import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

import { MenuService } from '../../core/menu/menu.service';
import { SettingsService } from '../../core/settings/settings.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {
  private user: User;
  private subscription: any;
  menuItems: Array<any>;
  router: Router;

  constructor(private menu: MenuService, public settings: SettingsService, private injector: Injector, private authService: AuthService) {
    this.menuItems = menu.getMenu();
  }

  /*
   Suscribe to subject

   */
  ngOnInit() {
    this.router = this.injector.get(Router);

    this.router.events.subscribe((val) => {
        // close any submenu opened when route changes
        this.removeFloatingNav();
        // scroll view to top
        window.scrollTo(0, 0);
    });

    this.subscription = this.authService.getUserSubject().subscribe((user: User) => { this.user = user; } );
  }

  /*
   Destroy subscription

   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleSubmenuClick(event) {
    if (!this.isSidebarCollapsed() && !this.isSidebarCollapsedText() && !this.isEnabledHover()) {
      event.preventDefault();

      const target = $(event.target || event.srcElement || event.currentTarget);
      let ul, anchor = target;

      // find the UL
      if (!target.is('a')) {
        anchor = target.parent('a').first();
      }
      ul = anchor.next();

      // hide other submenus
      const parentNav = ul.parents('.sidebar-subnav');
      $('.sidebar-subnav').each((idx, el) => {
        const $el = $(el);
        // if element is not a parent or self ul
        if (!$el.is(parentNav) && !$el.is(ul)) {
            this.closeMenu($el);
        }
      });

      // abort if not UL to process
      if (!ul.length) {
        return;
      }

      // any child menu should start closed
      ul.find('.sidebar-subnav').each((idx, el) => {
        this.closeMenu($(el));
      });

      // toggle UL height
      if (parseInt(ul.height(), 0)) {
        this.closeMenu(ul);
      }
      else {
        // expand menu
        ul.on('transitionend', () => {
            ul.height('auto').off('transitionend');
        }).height(ul[0].scrollHeight);
        // add class to manage animation
        ul.addClass('opening');
      }
    }
  }

  // Close menu collapsing height
  closeMenu(elem) {
    elem.height(elem[0].scrollHeight); // set height
    elem.height(0); // and move to zero to collapse
    elem.removeClass('opening');
  }

  toggleSubmenuHover(event) {
    const self = this;
    if (this.isSidebarCollapsed() || this.isSidebarCollapsedText() || this.isEnabledHover()) {
      event.preventDefault();

      this.removeFloatingNav();

      const target = $(event.target || event.srcElement || event.currentTarget);
      let ul, anchor = target;
      // find the UL
      if (!target.is('a')) {
        anchor = target.parent('a');
      }
      ul = anchor.next();

      if (!ul.length) {
        return; // if not submenu return
      }

      const $aside = $('.aside');
      const $asideInner = $aside.children('.aside-inner'); // for top offset calculation
      const $sidebar = $asideInner.children('.sidebar');
      const mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
      const itemTop = ((anchor.parent().position().top) + mar) - $sidebar.scrollTop();
      const floatingNav = ul.clone().appendTo($aside);
      const vwHeight = $(window).height();

      // let itemTop = anchor.position().top || anchor.offset().top;

      floatingNav
        .removeClass('opening') // necesary for demo if switched between normal//collapsed mode
        .addClass('nav-floating')
        .css({
          position: this.settings.layout.isFixed ? 'fixed' : 'absolute',
          top: itemTop,
          bottom: (floatingNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
        });

      floatingNav
        .on('mouseleave', () => { floatingNav.remove(); })
        .find('a').on('click', function(e) {
          e.preventDefault(); // prevents page reload on click
          // get the exact route path to navigate
          self.router.navigate([$(this).attr('route')]);
        });

      this.listenForExternalClicks();
    }
  }

  listenForExternalClicks() {
    const $doc = $(document).on('click.sidebar', (e) => {
      if (!$(e.target).parents('.aside').length) {
        this.removeFloatingNav();
        $doc.off('click.sidebar');
      }
    });
  }

  removeFloatingNav() {
    $('.nav-floating').remove();
  }

  isSidebarCollapsed() {
    return this.settings.layout.isCollapsed;
  }
  isSidebarCollapsedText() {
    return this.settings.layout.isCollapsedText;
  }
  isEnabledHover() {
    return this.settings.layout.asideHover;
  }

  /*
    Checks if the user has a current session
      - If it's false: Do not show Log In and Register menu items
      - If it's true: Do not show Log Out menu item

   */
  validateUser(text: string): boolean {
    switch (text) {
      case 'Iniciar sesión':
        return this.user == null ? true : false;
      case 'Registro':
        return this.user == null ? true : false;
      case 'Cerrar sesión':
        return this.user == null ? false : true;
      default:
        return true;
    }
  }
}
