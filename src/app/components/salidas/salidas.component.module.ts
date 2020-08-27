import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/app.shared.module';
import { SalidaComponent } from './salidas.component';
import { SalidasRoutingModule } from './salidas-routing.module';


@NgModule({
  declarations: [SalidaComponent],
  imports: [
    CommonModule,
    SalidasRoutingModule,
    SharedModule,
  ],
})
export class SalidaModule { }