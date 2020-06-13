import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { loginModel } from './login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatSnackBar, MatBottomSheet } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ],
})
export class LoginComponent implements OnInit {

  constructor(private builder: FormBuilder,
              private loginService: LoginService,
              private _snackBar: MatSnackBar,
              private _bottomSheet: MatBottomSheet,
              private router: Router,
  ) {
    this.loginForm = this.createFormGroup();
  }

  loginForm: FormGroup;


  @Output() logged: EventEmitter<any> = new EventEmitter();

  _status = false;
  _proc = false;
  resultError: string = null;
  @BlockUI() blockUI: NgBlockUI;
  hide = false;

  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.blockUI.start('Cargando...');
      this._proc = true;
      this.loginService.login(this.loginForm.value).subscribe((resp) => {
        this.blockUI.stop();
        if (resp.status === 500) {
          this.resultError = resp.message.substring(resp.message.indexOf(':') + 2, resp.message.length);
          this.openNotificationDanger(this.resultError);
        } else if (resp.status === 401 || resp.status === 412 || resp.status === 403 || resp.status === 404) {
          this.resultError = resp.message;
          this.openNotificationDanger(this.resultError);
        } else {
          this._status = resp.body.status !== 200;
          this.resultError = null;

          if (this._status) {
            this.resultError = 'login error ' + resp.status;
          } else {
            sessionStorage.setItem('isLogin', 'true');
            sessionStorage.setItem('token', resp.headers.get('Authorization'));
            this.logged.emit(null);
          }
        }
      });
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }


  openNotificationDanger(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
