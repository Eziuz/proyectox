import { Component, OnInit, Output, EventEmitter} from '@angular/core';
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
  providers: [LoginService],
})
export class LoginComponent implements OnInit {

  createFormGroup(){
    return new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      status: new FormControl('')
    });
  } 

  loginForm: FormGroup;

  constructor(private builder: FormBuilder,
              private loginService: LoginService,
              private _snackBar: MatSnackBar,
              private _bottomSheet: MatBottomSheet,
              private router: Router,
  ) {
    this.loginForm = this.createFormGroup();
  }

  @Output() logged: EventEmitter<any> = new EventEmitter();

  _status: boolean = false;
  resultError: string = null;
  @BlockUI() blockUI: NgBlockUI;

  login: loginModel = {
    username: '',
    password: '',
    status: 0
  };

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('Accion');
  }

  handleKeyPress(e){
    if (e.key === 'Enter'){
      this.onSubmit();
    }
  }

  Login() {
     return this.loginService.login(this.login);
  }



  openNotificationDanger(message: string, action?: string){
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'dangersnackBar'
    });
  }
}
