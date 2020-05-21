import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloodComponent } from './blood.component';


const routes: Routes = [
  {
    path: '',
    component: BloodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodRoutingModule { }
