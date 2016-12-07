import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { StockDetail } from './stockdetail';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class StockDetailService {
  
  private headers = new Headers({'Content-Type': 'application/json'});
  private stockUrl = 'http://localhost:8080/Stocker/stocker/stocks/detail/';  // URL to web api

  constructor(private http: Http) { }

  getStockFromIdObs(arg): Observable<StockDetail> { 
    return this.http.get(this.stockUrl + arg)
                    .catch(this.handleError)
                    .map(this.extractData);
  }

  private extractData(res: Response) {
      let body = res.json();
      console.log(res);
      return body || { };
      //return body.data || { };
  }

  private handleError(error: Response | any) {
      console.error('An error occurred', error); // for demo purposes only
      return Observable.throw(error.message || error);
  }

}
