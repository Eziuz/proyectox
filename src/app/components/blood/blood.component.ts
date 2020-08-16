import { Component, OnInit } from '@angular/core';
import { BloodService } from './blood.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HemocomponenteService } from 'src/app/services/Hemocomponente.service';
import { TipoSangreService } from 'src/app/services/TipoSangre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blood',
  templateUrl: './blood.component.html',
  styleUrls: ['./blood.component.css'],
  providers: [BloodService, HemocomponenteService]
})
export class BloodComponent implements OnInit {

  constructor(private bloodService: BloodService,
              private _snackBar: MatSnackBar,
              private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              private hemocomponenteService: HemocomponenteService) { }

  @BlockUI() blockUI: NgBlockUI;
  resultError: string = null;
  status = false;
  bloods: any = [];
  hemocomponentes: any = [];
  formFridge;
  arrayFridge = new Array();

  ngOnInit() {
    this.getAll();
    this.getAllHemocomponentes();
    this.formFridge = this.createFridgeForm();
  }

  getObjectToFridge(IdCompra) {
    const element = this.bloods.filter(item => {
      return item.idDetalleEntrada === IdCompra;
    });
    const newCantidad = this.formFridge.controls.cantidad.value;

    if (element[0].cantidad >= newCantidad && newCantidad !== 0) {
      this.arrayFridge.push({
        idElemento: element[0].idDetalleEntrada,
        hemocomponente: element[0].hemocomponente,
        cantidad: newCantidad,
        fechaRecoleccion: element[0].fechaRecoleccion,
        fechaVencimiento: element[0].fechaVencimiento,
        sangre: element[0].sangre,
        precio: element[0].precio
      });
      this.openNotificationDanger('Hemocomponente(s) agregado(s) a la nevera', 'Ok!');
      sessionStorage.setItem('fridge', JSON.stringify(this.arrayFridge));
    } else if (newCantidad === 0) {
      this.openNotificationDanger('Digite un valor diferente de cero', 'Ok!');
    } else {
      this.openNotificationDanger('Ha excedido la cantidad existente', 'Ok!');
    }
  }

  createFridgeForm() {
    return new FormGroup({
      cantidad: new FormControl('', [Validators.required])
    });
  }

  Trafficlights(IdDetalleEntrada) {
    const element = this.bloods.filter(item => {
      return item.idDetalleEntrada === IdDetalleEntrada;
    });
    const today = new Date();
    const element2 = this.hemocomponentes.find(item => {
      return item.idHemocomponente === element[0].idHemocomponente;
    });

    const fecha = new Date(element[0].fechaVencimiento);
    const trafficLight = Math.round((fecha.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (trafficLight > element2.diasNaranja) {
      return 'Green';
    } else if (trafficLight <= element2.diasNaranja && trafficLight > element2.diasRojo) {
      return 'Yellow';
    } else {
      return 'Red';
    }
  }

  getAll() {
    this.blockUI.start('Cargando Hemocomponentes...');
    this.bloodService.getAll().subscribe((resp) => {
      this.blockUI.stop();
      this.bloods = resp;
      console.log(this.bloods);
    },
      (err) => {
        console.error(err);
      });
  }

  getAllHemocomponentes() {
    this.hemocomponenteService.getAll().subscribe((resp) => {
      this.hemocomponentes = resp;
    },
      (err) => {
        console.error(err);
      });
  }

  openNotificationDanger(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}

@Component({
  templateUrl: './formBlood.html',
  styleUrls: ['./formBlood.css'],
  providers: [BloodService, HemocomponenteService, TipoSangreService]
})
export class AddBloodComponent implements OnInit {

  fichaTemp: any = [];
  Entrada: FormGroup;
  hemocomponentes: any = [];
  tipoSangres: any = [];
  maxDate = new Date();
  minDate = new Date();
  precioSugerido = 0;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private hemocomponenteService: HemocomponenteService,
              private tipoSangreService: TipoSangreService,
              private bloodService: BloodService,
              private router: Router
  ) { }

  ngOnInit() {
    this.Entrada = this.createFormGroup();
    this.getAllHemocomponentes();
    this.getAllTipoSangre();
  }

  createFormGroup() {
    return new FormGroup({
      fechaRecoleccion: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      hemocomponenteFk: new FormControl('', [Validators.required]),
      tipoSangre: new FormControl('', [Validators.required])
    });
  }

  getAllHemocomponentes() {
    this.hemocomponenteService.getAll().subscribe((resp) => {
      this.hemocomponentes = resp;
    },
      (err) => {
        console.error(err);
      });
  }

  getDays(innerText) {
    const element = this.hemocomponentes.find(item => {
      return item.nombreHemocomponente === innerText;
    });
    const date = new Date();
    date.setDate(date.getDate() - element.diasVigencia);
    this.minDate = date;
    this.fichaTemp.title = innerText;
    this.precioSugerido = element.precioSugerido;
  }

  getAllTipoSangre() {
    this.tipoSangreService.getAll().subscribe((resp) => {
      this.tipoSangres = resp;
    },
      (err) => {
        console.error(err);
      });
  }

  getTempData() {
    const date = new Date(this.Entrada.controls.fechaRecoleccion.value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let fecha;

    if (month < 10) {
      if (day >= 10) {
        fecha = `${year}-0${month}-${day}`;
      } else {
        fecha = `${year}-0${month}-0${day}`;
      }
    } else {
      if (day >= 10) {
        fecha = `${year}-${month}-${day}`;
      } else {
        fecha = `${year}-${month}-0${day}`;
      }
    }
    this.fichaTemp.fechaRecoleccion = fecha;
    this.fichaTemp.cantidad = this.Entrada.controls.cantidad.value;
    this.fichaTemp.precio = this.Entrada.controls.precio.value;
  }

  getBloodInfo(innerText) {
    this.fichaTemp.blood = innerText;
  }

  createBlood() {
    this.blockUI.start('Agregando Hemocomponente...');
    this.bloodService.createBlood(this.Entrada.value).subscribe((resp) => {
      alert('Hemocomponente agregado con exito');
      this.blockUI.stop();
      window.location.reload();
    },
      (err) => {
        console.error(err);
      });
  }

}
