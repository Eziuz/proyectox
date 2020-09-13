import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SalidaService } from 'src/app/services/Salida.service';
import { Chart } from 'chart.js';
import { of } from 'rxjs';

@Component({
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
    providers: [SalidaService]
})

export class ReportComponent implements OnInit {

    Chart = [];
    Reportes = [];
    months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'];

    constructor(private salidaService: SalidaService) {

    }

    ngOnInit() {
        this.getReports();
    }

    getReports() {
        this.salidaService.getReports().subscribe((resp) => {
            this.Reportes = resp;
            const cantidad = [];
            for (let i = 0; i < this.Reportes.length; i++) {
                for (let index = 0; index < 11; index++) {
                    if (this.Reportes[i].mes === index) {
                        cantidad[index - 1] = this.Reportes[i].cantidad;
                        break;
                    } else {
                        if (cantidad[index] === 0 || cantidad[index] === 'empty') {
                            cantidad[index] = 0;
                        }
                    }
                }
            }
            this.Chart = new Chart('canvas', {
                type: 'line',
                data: {
                    labels: this.months,
                    datasets: [{
                        label: 'Seguimiento Hemocomponentes Vendidos Dentro De La Aplicación',
                        data: cantidad,
                        backgroundColor: [
                            'rgb(230, 0, 0)'
                        ],
                        fill: false,
                        borderColor: [
                            'rgb(230, 0, 0)',
                        ],
                        borderWidth: 3
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
            console.log(cantidad);
        }, (error) => {
            console.error(error);
        });
    }

}
