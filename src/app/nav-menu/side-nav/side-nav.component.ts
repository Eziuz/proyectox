import { Component } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, Subscription } from 'rxjs';
import { MatSidenav, MatDialog } from '@angular/material';
import { AddBloodComponent } from 'src/app/components/blood/blood.component';
import { FridgeComponent } from 'src/app/components/Fridge/fridge.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  opened = false;
  @BlockUI() blockUI: NgBlockUI;

  constructor(public dialog: MatDialog,
              public router: Router) { }

  get user(): any {
    var _user;
    try {
      _user = jwt_decode(sessionStorage.getItem('token'));
    } catch (error) {
      _user = {};
    }
    return _user;
  }

  openDialog() {
    this.dialog.open(AddBloodComponent);
  }

  openFridge() {
    this.dialog.open(FridgeComponent);
  }

  logout() {
    this.router.navigateByUrl('/');
    this.blockUI.start('Cerrando Sesión');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isLogin');
    this.blockUI.stop();
  }
}
