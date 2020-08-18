import { Component, OnInit } from '@angular/core';
import { BloodService } from '../blood/blood.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { SalidaService } from 'src/app/services/Salida.service';
import * as jwt_decode from 'jwt-decode';

@Component({
    templateUrl: './fridge.html',
    styleUrls: ['./fridge.css'],
    providers: [BloodService, SalidaService]
})

export class FridgeComponent implements OnInit {

    fridgeItems: any = [];
    dataSource = new MatTableDataSource();

    constructor(private _snackBar: MatSnackBar,
        private salidaService: SalidaService) { }


    displayedColumns: string[] = ['hemocomponente', 'cantidad', 'fechaRecoleccion', 'fechaVencimiento',
        'sangre', 'precio', 'total', 'accion'];

    ngOnInit() {
        this.fridgeItems = this.getDataFridge();
        this.dataSource = new MatTableDataSource(this.fridgeItems);
        console.log(this.fridgeItems);
    }

    getCostoTotal(num1, num2) {
        return num1 * num2;
    }

    dropElement(index) {
        const fridgeItems = JSON.parse(sessionStorage.getItem('fridge'));
        const item = fridgeItems.find((object) => {
            return object.idElemento === index;
        });
        const itemToDelete = fridgeItems.indexOf(item);
        fridgeItems.splice(itemToDelete, 1);
        this.dataSource = fridgeItems;
        sessionStorage.setItem('fridge', JSON.stringify(fridgeItems));
    }



    getDataFridge() {
        return JSON.parse(sessionStorage.getItem('fridge'));
    }

    buyElements() {
        const fridgeItems = JSON.parse(sessionStorage.getItem('fridge'));
        const empresa = this.user.empresa;
        fridgeItems.forEach(element => {
            this.salidaService.createSalida(element, empresa).subscribe((resp) => {
                this.salidaService.createDetalleSalida(element).subscribe((response) => {
                    this.openNotificationDanger('Los hemocomponentes han sido comprados con éxito', '<3!');
                    window.location.reload();
                });
            }, (err) => {
                this.openNotificationDanger('No se puedo crear la salida debido a: ' + err, 'Ok!');
            });
        });
        sessionStorage.removeItem('fridge');
    }

    openSnackBar() {
        this._snackBar.open('Hemocomponente comprado con éxito', 'Ok!', {
            duration: 10000,
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

    openNotificationDanger(message: string, action?: string) {
        this._snackBar.open(message, action, {
            duration: 5000,
        });
    }
}
