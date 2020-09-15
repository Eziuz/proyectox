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
    ReportesPlaquetas = [];
    ReportesGlobulos = [];
    ReportesPlasma = [];
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
                        fill: false,
                        borderColor: [
                            'rgb(255, 0, 0)',
                        ],
                        borderWidth: 3
                    },
                    {
                        label: 'Seguimiento de Plaquetas',
                        data: this.getReportsPlaquetas(),
                        fill: false,
                        borderColor: [
                            'rgb(224, 227, 227)'
                        ],
                        borderWidth: 2
                    },
                    {
                        label: 'Seguimiento de Glóbulos',
                        data: this.getReportsGlobulos(),
                        fill: false,
                        borderColor: [
                            'rgb(225, 0, 0)'
                        ],
                        borderWidth: 2
                    },
                    {
                        label: 'Seguimiento de Plasma',
                        data: this.getReportsPlasma(),
                        fill: false,
                        borderColor: [
                            'rgb(0, 255, 0)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: false
                        }]
                    }
                }
            });
        }, (error) => {
            console.error(error);
        });
    }

    getReportsPlaquetas() {
        const cantidadPlaquetas = [];
        this.salidaService.getReportsPlaquetas().subscribe((resp) => {
            this.ReportesPlaquetas = resp;
            for (let i = 0; i < this.ReportesPlaquetas.length; i++) {
                for (let index = 0; index < 11; index++) {
                    if (this.Reportes[i].mes === index) {
                        cantidadPlaquetas[index - 1] = this.ReportesPlaquetas[i].cantidad;
                        break;
                    } else {
                        if (cantidadPlaquetas[index] === 0 || cantidadPlaquetas[index] === 'empty') {
                            cantidadPlaquetas[index] = 0;
                        }
                    }
                }
            }
        }, (error) => {
            console.error(error);
        });
        return cantidadPlaquetas;
    }

    getReportsGlobulos() {
        const cantidadGlobulos = [];
        this.salidaService.getReportsGlobulos().subscribe((resp) => {
            this.ReportesGlobulos = resp;
            for (let i = 0; i < this.ReportesGlobulos.length; i++) {
                for (let index = 0; index < 11; index++) {
                    if (this.ReportesGlobulos[i].mes === index) {
                        cantidadGlobulos[index - 1] = this.ReportesGlobulos[i].cantidad;
                        break;
                    } else {
                        if (cantidadGlobulos[index] === 0 || cantidadGlobulos[index] === 'empty') {
                            cantidadGlobulos[index] = 0;
                        }
                    }
                }
            }
        }, (error) => {
            console.error(error);
        });
        return cantidadGlobulos;
    }

    getReportsPlasma() {
        const cantidadPlasma = [];
        this.salidaService.getReportsPlasma().subscribe((resp) => {
            this.ReportesPlasma = resp;
            for (let i = 0; i < this.ReportesPlasma.length; i++) {
                for (let index = 0; index < 11; index++) {
                    if (this.ReportesPlasma[i].mes === index) {
                        cantidadPlasma[index - 1] = this.ReportesPlasma[i].cantidad;
                        break;
                    } else {
                        if (cantidadPlasma[index] === 0 || cantidadPlasma[index] === 'empty') {
                            cantidadPlasma[index] = 0;
                        }
                    }
                }
            }
        }, (error) => {
            console.error(error);
        });
        return cantidadPlasma;
    }
}
