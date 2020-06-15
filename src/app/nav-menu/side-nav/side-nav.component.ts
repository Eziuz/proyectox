import { Component } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, Subscription } from 'rxjs';
import { MatSidenav, MatDialog } from '@angular/material';
import { AddBloodComponent } from 'src/app/components/blood/blood.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent{

  opened = false;

  constructor(public dialog: MatDialog) {  }

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
}
