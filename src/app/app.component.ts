import { Component, HostListener, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {
  Event as RouterEvent, Router, NavigationStart, NavigationEnd, NavigationError,
  NavigationCancel
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hemotec';

  @BlockUI() blockUI: NgBlockUI;

  constructor(private router: Router) {
    window['appComponent'] = this;
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e);
    });
  }

  get user(): any {
    var _user;
    try {
      _user = jwt_decode(sessionStorage.getItem('token'));
    } catch (error) {
      _user = {};
    }
    return _user;
  }

  /*@HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    event.returnValue = false;
  }*/

  ngAfterViewInit() {
  }
  
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.blockUI.start('Cargando Información...');
      console.log('nStart');
    }

    if (event instanceof NavigationEnd) {
      this.blockUI.stop();
      console.log('nStop');
    }

    // Eventos cancelados o fallidos

    if (event instanceof NavigationError) {
      this.blockUI.stop();
      console.log('nError');
    }

    if (event instanceof NavigationCancel) {
      this.blockUI.stop();
      console.log('nCancel');
    }

  }

  get isLogin(): boolean {
    return JSON.parse(sessionStorage.getItem('isLogin') || 'false');
  }
}
