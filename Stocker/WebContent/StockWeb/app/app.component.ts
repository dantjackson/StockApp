import { Component }      from '@angular/core';
import { StockDetail }    from './stockdetail';

@Component({
  selector: 'my-app',
template: `
   <div class="blue column">
   <h1>{{title}}</h1>
   <nav>
     <a routerLink="/dashboard">Dashboard</a>
     <a routerLink="/heroes">Heroes</a>
   </nav>
   <router-outlet></router-outlet>
   </div>
 `
})
export class AppComponent {
  title = 'Stock Search';
  detail = 'Stock Detail';
  // This sets up the Call to the child component.
  selectedstockDetail = '123';
}
