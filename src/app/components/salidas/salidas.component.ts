import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { SalidaService } from 'src/app/services/Salida.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import * as jwt_decode from 'jwt-decode';

@Component({
    templateUrl: './salidas.component.html',
    styleUrls: ['./salidas.component.css'],
    providers: []
})

export class SalidaComponent implements OnInit {

    constructor(private salidaService: SalidaService,
                private _snackBar: MatSnackBar) { }

    @BlockUI() blockUI: NgBlockUI;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns: string[] = ['Precio', 'Cantidad', 'Descuento', 'Hemocomponente', 'Empresa',
        'Empresa vendedora'];
    dataSource = new MatTableDataSource();

    ngOnInit() {
        this.getSalidas();
        this.dataSource.paginator = this.paginator;
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

    getSalidas() {
        const idEmpresa = this.user.empresa;
        const tipoEmpresa = this.user.tipoEmpresa;
        this.blockUI.start('Cargando Salidas...');
        if(tipoEmpresa === 1) {
            
        }
        this.salidaService.getAllSalida().subscribe((resp) => {
            this.blockUI.stop();
            this.dataSource.data = resp;
        },
            (err) => {
                console.error(err);
            });
    }
}
