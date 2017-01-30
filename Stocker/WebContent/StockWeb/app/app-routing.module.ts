import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { StockListComponent }   from './stocklist.component';
import { PortfolioComponent }   from './portfolio.component';
import { UtilComponent }        from './util.component';
import { PrivateComponent }     from './auth.private.component'
import { LoginComponent }       from './auth.component'


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard',       component: DashboardComponent },
  { path: 'portfolio',       component: PortfolioComponent },
  { path: 'stocksearch',     component: StockListComponent },
  { path: 'utils',           component: UtilComponent },
  { path: 'login',           component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
