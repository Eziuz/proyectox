import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    providers: []
})

export class MainComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit(): void {
        console.log('Campañas');
    }

    get isLogin(): boolean {
        return JSON.parse(sessionStorage.getItem('isLogin') || 'false');
    }
}
