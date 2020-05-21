import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodRoutingModule } from './blood-routing.module';
import { BloodComponent } from './blood.component';


@NgModule({
  declarations: [BloodComponent],
  imports: [
    CommonModule,
    BloodRoutingModule
  ]
})
export class BloodModule { }
