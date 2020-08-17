import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: './registerBusiness.component.html',
    styleUrls: ['./registerBusiness.component.html'],
    providers: []
})
export class RegisterBusinessComponent implements OnInit {

    ngOnInit() {
        console.log('Ahorita creamos el form a ver qué pedal :v');
    }
}