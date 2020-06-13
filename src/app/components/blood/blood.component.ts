import { Component, OnInit } from '@angular/core';
import { BloodService } from './blood.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blood',
  templateUrl: './blood.component.html',
  styleUrls: ['./blood.component.css'],
  providers: [BloodService,]
})
export class BloodComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private bloodService: BloodService,
              private snackBar: MatSnackBar,
              private _formBuilder: FormBuilder,
              public dialog: MatDialog) { }

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

  openDialog() {
    this.dialog.open(AddBloodComponent);
  }

}

@Component({
  templateUrl: 'formBlood.html'
})
export class AddBloodComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private bloodService: BloodService,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
