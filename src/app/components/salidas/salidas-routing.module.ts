import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalidaComponent } from './salidas.component';


const routes: Routes = [
    {
        path: '',
        component: SalidaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalidasRoutingModule { }