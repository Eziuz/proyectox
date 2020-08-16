import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import * as jwt_decode from 'jwt-decode';
import { RolService } from 'src/app/services/rol.service';

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

  displayedColumns: string[] = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'genero', 'correo', 'estado'];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.getAllUsers();
    this.matPaginator._intl.itemsPerPageLabel = 'Usuarios por página';
  }

  getAllUsers() {
    this.blockUI.start('Cargando Usuarios...');
    this.userService.getAll().subscribe((resp) => {
      this.blockUI.stop();
      this.dataSource.data = resp;
      console.log(resp);
    },
      (err) => {
        console.error(err);
      });
  }

  openRegister() {
    this.dialog.open(UserRegisterComponent);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  constructor(private rolService: RolService) { }

  ngOnInit() {
    this.userData = this.createUserDataForm();
  }

  createUserDataForm() {
    return new FormGroup({
      primerNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{2, 25}')]),
      segundoNombre: new FormControl('N/A', [Validators.pattern('[a-zA-Z ]{2, 25}')]),
      primerApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{2, 25}')]),
      segundoApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{2, 25}')]),
      genero: new FormControl('', [Validators.required, Validators.minLength(1)]),
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{2, 25}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      idEmpresa: new FormControl(this.user.empresa),
      rol: new FormControl('', [Validators.required])
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

  getRoles() {
    this.rolService.getAll().subscribe((resp) => {
      this.roles = resp;
    },
      (err) => {
        console.error(err);
      });
  }
}
