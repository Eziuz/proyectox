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
    dataSource = new MatTableDataSource();

    constructor(private _snackBar: MatSnackBar) { }


    displayedColumns: string[] = ['hemocomponente', 'cantidad', 'fechaRecoleccion', 'fechaVencimiento', 
    'sangre', 'precio', 'total', 'accion'];

    ngOnInit() {
        this.fridgeItems = this.getDataFridge();
        this.dataSource = new MatTableDataSource(this.fridgeItems);
        console.log(this.fridgeItems);
    }

    getCostoTotal() {
        const fridgeItems = JSON.parse(sessionStorage.getItem('fridge'));
        return fridgeItems.reduce((sum, value) => (typeof value.precio === 'number' ? sum + (value.precio * value.cantidad) : sum), 0);
    }

    dropElement(index) {
        const fridgeItems = JSON.parse(sessionStorage.getItem('fridge'));
        fridgeItems.splice(index, 1);
        this.dataSource = fridgeItems;
        sessionStorage.setItem('fridge', JSON.stringify(fridgeItems));
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
