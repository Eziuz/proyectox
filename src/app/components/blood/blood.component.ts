import { Component, OnInit } from '@angular/core';
import { BloodService } from './blood.service';
import { MatSnackBar } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-blood',
  templateUrl: './blood.component.html',
  styleUrls: ['./blood.component.css'],
  providers: [ BloodService ]
})
export class BloodComponent implements OnInit {

  constructor(private bloodService: BloodService,
              private snackBar: MatSnackBar) { }

  @BlockUI() blockUI: NgBlockUI;
  resultError: string = null;
  status = false;
  bloods: any = [];

  ngOnInit() {
    this.getAll();
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

  openNotificationDanger(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
