import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { SalidaService } from 'src/app/services/Salida.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
    templateUrl: './salidas.component.html',
    styleUrls: ['./salidas.component.css'],
    providers: []
})

export class SalidaComponent implements OnInit {

    constructor(private salidaService: SalidaService,
        private _snackBar: MatSnackBar,
        
    ) { }

    @BlockUI() blockUI: NgBlockUI;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns: string[] = ['Precio', 'Cantidad', 'Descuento', 'Hemocomponente', 'Empresa',
        'Empresa vendedora'];
    dataSource = new MatTableDataSource();

    ngOnInit() {
        this.getSalidas();
        this.dataSource.paginator = this.paginator;
    }

    getSalidas() {
        this.blockUI.start('Cargando Salidas...');
        this.salidaService.getAllSalida().subscribe((resp) => {
            this.blockUI.stop();
            this.dataSource.data = resp;
        },
            (err) => {
                console.error(err);
            });
    }

    getPrecioPagado(num1, num2) {
        return num1 * num2;
    }

}
