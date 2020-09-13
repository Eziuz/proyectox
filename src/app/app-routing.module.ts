import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './components/work/found.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: () => import('./components/main/main.module').then(mod => mod.MainModule)
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'hemocomponentes',
    loadChildren: () => import('./components/blood/blood.module').then(mod => mod.BloodModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./components/user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'changePassword',
    loadChildren: () => import('./components/password/password.module').then(mod => mod.PasswordModule)
  },
  {
    path: 'registerbusiness',
    loadChildren: () => import('./components/business/register/registerBusiness.module').then(mod => mod.RegisterBusinessModule)
  },
  {
    path: 'getaway',
    loadChildren: () => import('./components/salidas/salidas.component.module').then(mod => mod.SalidaModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./components/reports/report.module').then(mod => mod.ReportModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
