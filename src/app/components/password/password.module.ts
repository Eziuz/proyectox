import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';
import { SharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [PasswordComponent],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    SharedModule,
  ],
})
export class PasswordModule { }