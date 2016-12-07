import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroService }          from './hero.service';
import { StockDetailComponent } from './stock-detail.component';
import { AppRoutingModule }     from './app-routing.module';
import {SearchBox}              from './search.box';
import {SearchPipe}            from './search.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    StockDetailComponent,
    SearchBox,
    SearchPipe
  ],
  providers: [ HeroService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
