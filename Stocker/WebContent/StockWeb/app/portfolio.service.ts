import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Portfolio } from './Portfolio';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export  class AddStock {
  public constructor(
	public stockId: string,
	public stockPrice: string,
	public stockQty: string,
	public stockAdded: boolean,
	public stockMessage: string
  ) {}
}

@Injectable()
export class PortFolioService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private stockUrl = 'http://localhost:8080/Stocker/stocker/stocks/folio/1';  // URL to web api
  private postAddStockUri: string = "http://localhost:8080/Stocker/stocker/stocks/folio/addstock";

  constructor(private http: Http) { }

  getPortFoliosSvc(arg): Observable<Portfolio[]> { 
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

  postAddStockToPort(addStock:AddStock) {
    var json = JSON.stringify( {"stockId":addStock.stockId
        , stockPrice: addStock.stockPrice, stockQty: addStock.stockQty, 
        stockAdded: addStock.stockAdded, stockMessage:addStock.stockMessage}
    );

    console.debug("Params");
    var headers = new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post(this.postAddStockUri, 
        json, {headers: headers})
        .map(res => res.json());
  }

}