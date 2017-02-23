import { Component }      from '@angular/core';
import {AuthenticationService} from './auth.service'
import {User} from './user'
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';


@Component({
  selector: 'my-app',
  providers: [AuthenticationService],
  template: `
      <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand">Stocker</a>
            <ul class="nav navbar-nav" routerLinkActive="active">
                <li class="nav-item"><a class="nav-link" routerLink="/dashboard">Home</a></li>
                <li class="nav-item"><a class="nav-link" routerLink="/portfolio">Portfolio</a></li>
                <li class="nav-item"><a class="nav-link" routerLink="/stocksearch">Stock Search</a></li>
                <li class="nav-item"><a class="nav-link" routerLink="/utils">Utilities</a></li>
            </ul>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="https://github.com/mlaval/angular2-bootstrap">Github</a></li>
              <li>
                    <a class="nav-link" (click)="logout()">Logout</a>
              </li>
              <li class="nav-item">{{user.email}}</li>
            </ul>
          </div>
        </div>
      </div>      
      <div class="container">
          <div class="content">
            <router-outlet></router-outlet>
        </div>
      </div>
  `
})
export class AppComponent {

  user = new User('','','','','',false,'','','');

  constructor(
        private _service:AuthenticationService,  router: Router) {
  router.events.forEach((event) => {
    if(event instanceof NavigationStart) {
      //console.debug("Route Changed");
      //console.debug(event.url);
      var eventstr = event.url.toLowerCase();
      if (!eventstr.includes("/login")) {
      // Detects the route has changed.
         var userstr = this._service.checkCredentials(); 
         //console.debug(userstr);
        if (typeof userstr != 'undefined') {
           var userJSON = JSON.parse(userstr);
          Object.assign(this.user,userJSON);
        }     
     }
    }
  });
  }

 ngOnInit() {
    this._service.checkCredentials(); 
  }

    logout() {
      console.debug("logout");
      this._service.logout();
    }

}
