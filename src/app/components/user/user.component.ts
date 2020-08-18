import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog, MatPaginator, MatTableDataSource, MatSnackBarRef } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import * as jwt_decode from 'jwt-decode';
import { RolService } from 'src/app/services/rol.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { window } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, MatPaginator]
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,
              private _snackBar: MatSnackBar,
              private matPaginator: MatPaginator,
              private dialog: MatDialog) { }

  @BlockUI() blockUI: NgBlockUI;
  users: any = [];
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'empresa',
    'genero', 'correo', 'estado'];
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();

  ngOnInit() {
    this.getUsersByBusiness();
    this.getAllUsers();
    this.matPaginator._intl.itemsPerPageLabel = 'Usuarios por página';
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator;
  }

  getAllUsers() {
    this.blockUI.start('Cargando Usuarios...');
    this.userService.getAll().subscribe((resp) => {
      this.blockUI.stop();
      this.dataSource.data = resp;
    },
      (err) => {
        console.error(err);
      });
  }

  getUsersByBusiness() {
    this.blockUI.start('Cargando Usuarios...');
    const idEmpresa = this.user.empresa;
    this.userService.getAllByBusiness(idEmpresa).subscribe((resp) => {
      this.blockUI.stop();
      this.dataSource2.data = resp;
    },
      (err) => {
        console.error(err);
      });
  }

  async changeStatus(row) {
    const snackBarRef = this._snackBar.open('¿Está seguro de que desea cambiar el estado de '
      + row.primerNombre + ' ' + row.primerApellido + '?', 'Sí', {
      duration: 7000
    });
    snackBarRef.onAction().subscribe(() => {
      let newStatus = 0;
      if (row.idEstado !== 1) {
        newStatus = 1;
      } else {
        newStatus = 2;
      }
      this.userService.updateUserStatus(row, newStatus).subscribe((resp) => {
        this.openNotificationDanger('Se ha cambiado el estado del usuario con éxito', 'Ok!');
      }, (err) => {
        this.openNotificationDanger('No hemos podido actualizar el estado debido a: ' + err);
      });
    });
  }

  get user(): any {
    let _user;
    try {
      _user = jwt_decode(sessionStorage.getItem('token'));
    } catch (error) {
      _user = {};
    }
    return _user;
  }

  openRegister() {
    this.dialog.open(UserRegisterComponent);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  openNotificationDanger(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}


@Component({
  templateUrl: './user_register.component.html',
  styleUrls: ['./user_register.component.css'],
  providers: [UserService, RolService]
})
export class UserRegisterComponent implements OnInit {

  userData: FormGroup;
  roles = [];
  users = [];
  same = false;
  sameEmail = false;
  change = false;

  constructor(private rolService: RolService,
              private userService: UserService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getRoles();
    this.userData = this.createUserDataForm();
    this.getAllUsers();
  }

  createUserDataForm() {
    return new FormGroup({
      primerNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      segundoNombre: new FormControl('N/A', [Validators.pattern('[a-zA-Z]+')]),
      primerApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      segundoApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      genero: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('', [Validators.required])
    });
  }

  get user(): any {
    let _user;
    try {
      _user = jwt_decode(sessionStorage.getItem('token'));
    } catch (error) {
      _user = {};
    }
    return _user;
  }

  getRoles() {
    this.rolService.getAll().subscribe((resp) => {
      this.roles = resp;
      console.log(this.roles);
    },
      (err) => {
        console.error(err);
      });
  }

  getAllUsers() {
    this.userService.getAll().subscribe((resp) => {
      this.users = resp;
    },
      (err) => {
        console.error(err);
      });
  }

  findSameUser() {
    const sameUser = this.users.filter(item => item.username === this.userData.value.username.toLowerCase());
    if (sameUser.length > 0) {
      this.same = true;
      document.getElementById('alert-msj').style.display = 'block';
      this.openNotificationDanger('Este usuario ya se encuentra registrado', 'Ok!');
    } else {
      document.getElementById('alert-msj').style.display = 'none';
    }
  }

  findSameEmail() {
    const sameEmail = this.users.filter(item => item.correo === this.userData.value.email.toLowerCase());
    if (sameEmail.length > 0) {
      this.sameEmail = true;
      document.getElementById('alert-msj-email').style.display = 'block';
      this.openNotificationDanger('Este correo ya se encuentra registrado', 'Ok!');
    } else {
      document.getElementById('alert-msj-email').style.display = 'none';
    }
  }

  getRolesPerUser() {
    const rol = this.user.rol;
    if (rol === '1' && this.change === false) {
      this.removeItemFromArr(this.roles, 1);
      this.removeItemFromArr(this.roles, 1);
      this.change = true;
    } else if (rol === '4' && this.change === false) {
      this.removeItemFromArr(this.roles, 0);
      this.removeItemFromArr(this.roles, 0);
      this.change = true;
    }
  }

  removeItemFromArr(arr, item) {
    arr.splice(item, 1);
  }

  createUser() {
    const password = this.generatePassword();
    const idEmpresa = this.user.empresa;
    const templateParams = {
      origin: this.userData.value.email,
      name: this.userData.value.primerNombre,
      Contrasena: password,
      username: this.userData.value.username
    };

    this.userService.createUser(this.userData.value, password, idEmpresa).subscribe((resp) => {
      emailjs.init('user_TSdB9S6ftUtNTN8spoahF');
      emailjs.send('gmail', 'template_MROMLVaa', templateParams).then((response) => {
        this.openNotificationDanger('Este usuario se ha registrado exitosamente', 'Ok!');
      }, (err) => {
        this.openNotificationDanger('Ha ocurrido un error al momento de enviar el correo,'
          + 'si el error persiste comunicate con soporte', 'Ok!');
      });
    },
      (err) => {
        this.openNotificationDanger('Ha ocurrido un error al momento de registrar el usuario', 'Ok!');
      });
  }

  generatePassword() {
    const length = 15;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/-*';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  openNotificationDanger(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
