import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponentRoutingModule } from './registerBusiness-routing.module';
import { SharedModule } from 'src/app/app.shared.module';
import { RegisterBusinessComponent } from './registerBusiness.component';


@NgModule({
    declarations: [RegisterBusinessComponent],
    imports: [
        CommonModule,
        RegisterComponentRoutingModule,
        SharedModule,
    ],
})
export class RegisterBusinessModule { }