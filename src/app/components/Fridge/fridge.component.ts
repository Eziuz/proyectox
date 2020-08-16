import { Component, OnInit } from '@angular/core';
import { BloodService } from '../blood/blood.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './fridge.html',
    styleUrls: ['./fridge.css'],
    providers: [BloodService]
})

export class FridgeComponent implements OnInit {

    fridgeItems: any = [];
    dataSource: any;

    constructor(private _snackBar: MatSnackBar) { }


    displayedColumns: string[] = ['hemocomponente', 'cantidad', 'fechaRecoleccion', 'fechaVencimiento', 'sangre', 'precio', 'accion'];

    ngOnInit() {
        this.fridgeItems = this.getDataFridge();
        this.dataSource = new MatTableDataSource(this.fridgeItems);
        console.log(this.fridgeItems);
    }

    getDataFridge() {
        return JSON.parse(sessionStorage.getItem('fridge'));
    }

    buyElements() {
        sessionStorage.removeItem('fridge');
        this.openSnackBar();
    }

    openSnackBar() {
        this._snackBar.open('Hemocomponente comprado con éxito', 'Ok!', {
            duration: 10000,
        });
    }
}
