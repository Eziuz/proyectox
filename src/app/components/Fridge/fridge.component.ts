import { Component, OnInit } from '@angular/core';
import { BloodService } from '../blood/blood.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    templateUrl: './fridge.html',
    providers: [ BloodService ]
})

export class FridgeComponent implements OnInit {

    fridgeItems: any = [];
    dataSource: any;

    displayedColumns: string[] = ['hemocomponente', 'cantidad', 'fechaRecoleccion', 'fechaVencimiento', 'sangre', 'precio'];

    ngOnInit() {
        this.fridgeItems = this.getDataFridge();
        this.dataSource = new MatTableDataSource(this.fridgeItems);
    }

    getDataFridge() {
        return JSON.parse(sessionStorage.getItem('fridge'));
    }
}
