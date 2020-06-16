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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    AddBloodComponent,
    FridgeComponent
  ],
  entryComponents: [
    AddBloodComponent,
    FridgeComponent
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
