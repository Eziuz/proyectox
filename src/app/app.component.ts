import { Component } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hemotec';

  get user(): any{
    var _user;
    try{
      _user = jwt_decode(sessionStorage.getItem('token'));
    }catch(error){
      _user = {};
    }
    return _user;
  }

  logout(){
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('isLogin', '');
  }

  get isLogin(): boolean{
    return JSON.parse(sessionStorage.getItem('isLogin') || 'false');
  }
}
