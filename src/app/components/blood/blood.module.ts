import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodRoutingModule } from './blood-routing.module';
import { BloodComponent } from './blood.component';
import { SharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [BloodComponent],
  imports: [
    CommonModule,
    BloodRoutingModule,
    SharedModule,
  ],
})
export class BloodModule { }
