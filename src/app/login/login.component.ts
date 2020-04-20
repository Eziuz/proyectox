import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { loginModel } from './login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatBottomSheet} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    LoginService
  ]
})
export class LoginComponent implements OnInit {

  selectedLogin: loginModel;
  loginForm: FormGroup;

  @Output() logged: EventEmitter<any> = new EventEmitter();

  _status: boolean = false;
  resultError: string = null;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private builder: FormBuilder,
              private loginService: LoginService,
              private _snackBar: MatSnackBar,
              private _bottomSheet: MatBottomSheet,
              private router: Router,
  ) {
    this.selectedLogin = new loginModel();
  }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username: [ this.selectedLogin.username, Validators.required ],
      password: [ this.selectedLogin.password, Validators.required ]
    }, {
      validators: (formGroup: FormGroup): ValidationErrors | null => {
        const data = formGroup.getRawValue();
        const validationErrors = {};

        return validationErrors;
      }
    });
  }

  onSubmit(formData: loginModel){
    if (this.loginForm.valid){
      this.blockUI.start('Cargando...');
      this.loginService.login(formData).subscribe((resp) => {
        this.blockUI.stop();

        if (resp.status === 500){
          this.resultError = resp['message'].substring(resp['message'].indexOf(':') + 2, resp['message'].length);
          this.openNotificationDanger(this.resultError);
        }else if (resp.status === 401 || resp.status === 412 || resp.status === 403 || resp.status === 404){
          this.resultError = resp['message'];
          this.openNotificationDanger(this.resultError);
        }else {
          this._status = resp.body.status !== 200;
          this.resultError = null;

          if (this._status){
            this.resultError = 'login error ' + resp.status;
          }else {
            sessionStorage.setItem('token', resp.headers.get('Autorizathion'));
            sessionStorage.setItem('isLogin', 'true');
            this.logged.emit(null);
          }
        }
      });
    }
  }

  handleKeyPress(e, formData){
    if (e.key === 'Enter'){
      this.onSubmit(formData);
    }
  }

  openNotificationDanger(message: string, action?: string){
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'dangersnackBar'
    });
  }
}
