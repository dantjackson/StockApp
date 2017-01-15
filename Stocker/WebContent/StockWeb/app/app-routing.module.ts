import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { StockListComponent }   from './stocklist.component';
import { PortfolioComponent }   from './portfolio.component';
import { UtilComponent }        from './util.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',       component: DashboardComponent },
  { path: 'portfolio',       component: PortfolioComponent },
  { path: 'stocksearch',     component: StockListComponent },
  { path: 'utils',           component: UtilComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
