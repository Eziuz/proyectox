import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadService } from 'src/app/services/Ciudad.service';
import { UserService } from '../../user/user.service';
import { EmpresaService } from 'src/app/services/Empresa.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
    templateUrl: './registerBusiness.component.html',
    styleUrls: ['./registerBusiness.component.css'],
    providers: [CiudadService, UserService, EmpresaService]
})
export class RegisterBusinessComponent implements OnInit {

    businessData: FormGroup;
    userData: FormGroup;
    cities = [];
    users = [];
    businesses = [];
    hide = false;
    same = false;
    sameEmail = false;
    sameNumber = false;
    sameBusinessName = false;

    constructor(private cityService: CiudadService,
        private _snackBar: MatSnackBar,
        private userService: UserService,
        private empresaService: EmpresaService,
        private router: Router) { }

    ngOnInit() {
        this.getAllCities();
        this.getAllUsers();
        this.getAllBusinesses();
        this.businessData = this.setbusinessDataForm();
        this.userData = this.createUserDataForm();
    }

    setbusinessDataForm() {
        return new FormGroup({
            nombreEmpresa: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
            tipoEmpresa: new FormControl('', [Validators.required]),
            direccion: new FormControl('', [Validators.required]),
            telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9 ]+$')]),
            ciudad: new FormControl('', [Validators.required]),
            cuentaBancaria: new FormControl('', [Validators.required, Validators.pattern('^[0-9 ]+$')])
        });
    }

    createUserDataForm() {
        return new FormGroup({
            primerNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
            segundoNombre: new FormControl('N/A', [Validators.pattern('^[a-zA-Z ]+$')]),
            primerApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
            segundoApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
            genero: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]),
            email: new FormControl('', [Validators.required, Validators.email])
        });
    }

    getAllCities() {
        this.cityService.getAll().subscribe((resp) => {
            this.cities = resp;
        },
            (err) => {
                this.openNotificationDanger('Ha ocurrido un error al cargar la información referente a las ciudades'
                    , 'Ok!');
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

    getAllBusinesses() {
        this.empresaService.getAll().subscribe((resp) => {
            this.businesses = resp;
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

    findSameNumber() {
        const sameNumber = this.businesses.filter(item => item.telefono === this.businessData.value.telefono);
        if (sameNumber.length > 0) {
            this.sameNumber = true;
            document.getElementById('alert-msj-number').style.display = 'block';
            this.openNotificationDanger('Este número ya se encuentra registrado', 'Ok!');
        } else {
            document.getElementById('alert-msj-number').style.display = 'none';
        }
    }

    findSameBusinessName() {
        const sameBusinessname = this.businesses.filter(item => item.nombreEmpresa === this.businessData.value.nombreEmpresa);
        if (sameBusinessname.length > 0) {
            this.sameBusinessName = true;
            document.getElementById('alert-msj-businessName').style.display = 'block';
            this.openNotificationDanger('Este nombre ya se encuentra registrado', 'Ok!');
        } else {
            document.getElementById('alert-msj-businessName').style.display = 'none';
        }
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

    createBusiness() {
        this.empresaService.createBusiness(this.businessData.value).subscribe((resp) => {
            this.openNotificationDanger('La empresa se ha registrado con éxito', 'Ok!');
            const password = this.generatePassword();
            this.userService.createAdminUser(this.userData.value, password).subscribe((response) => {
                if (response.sqlcode === 0) {
                    const templateParams = {
                        origin: this.userData.value.email,
                        name: this.userData.value.primerNombre,
                        Contrasena: password,
                        username: this.userData.value.username
                    };
                    emailjs.init('user_TSdB9S6ftUtNTN8spoahF');
                    emailjs.send('gmail', 'template_MROMLVaa', templateParams).then((responseemail) => {
                        this.openNotificationDanger('Este usuario se ha registrado exitosamente', 'Ok!');
                        this.router.navigateByUrl('/');
                    }, (err) => {
                        this.openNotificationDanger('Ha ocurrido un error al momento de enviar el correo,'
                        + 'si el error persiste comunicate con soporte', 'Ok!');
                    });
                }
            }, (err) => {
                this.openNotificationDanger('No fue posible registrar tu usuario, intentalo de nuevo o contacta al ' +
                    'soporte con este error: ' + err, 'Ok!');
            });
        }, (err) => {
            this.openNotificationDanger('No fue posible registrar la empresa, intentalo de nuevo o contacta al ' +
                'soporte con este error: ' + err, 'Ok!');
        });
    }

    openNotificationDanger(message: string, action?: string) {
        this._snackBar.open(message, action, {
            duration: 5000,
        });
    }
}
