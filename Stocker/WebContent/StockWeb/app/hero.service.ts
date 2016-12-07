import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';
@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://localhost:8080/Stocker/stocker/stocks/s&s&s';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json() as Hero[])
               // removed .data from response.json() as this is not a property in the JSON returned.
               .catch(this.handleError);
  }

  getHero(stockId: string): Promise<Hero> {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.stockId === stockId));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
	
}