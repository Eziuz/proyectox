import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BlockUIModule } from 'ng-block-ui';
import { SideNavComponent } from './nav-menu/side-nav/side-nav.component';
import { SharedModule } from './app.shared.module';
import { AddBloodComponent } from './components/blood/blood.component';
import { FridgeComponent } from './components/Fridge/fridge.component';
import { NotFoundComponent } from './components/work/found.component';
import { MainComponent } from './components/main/main.component';
import { UserRegisterComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    AddBloodComponent,
    FridgeComponent,
    NotFoundComponent,
    UserRegisterComponent
  ],
  entryComponents: [
    AddBloodComponent,
    FridgeComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule.forRoot(),
  ],
  providers: [ SideNavComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
