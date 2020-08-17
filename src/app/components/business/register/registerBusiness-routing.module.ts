import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterBusinessComponent } from './registerBusiness.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterBusinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterComponentRoutingModule { }
