import { Component }      from '@angular/core';
import { StockDetail }    from './stockdetail';

@Component({
  selector: 'my-app',
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

}
