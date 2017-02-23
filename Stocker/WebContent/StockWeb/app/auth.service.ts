import {Injectable} from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
 
var users = [
    new User('admin@admin.com','welcome1','','','',false,'','',''),
    new User('test@gmail.com','welcome1','','','',false,'','','')
];

@Injectable()
export class AuthenticationService {
 
     usersnew:User[];

  constructor(
    private _router: Router, private _http: Http){}
    userLoginUri : string = "http://localhost:8080/Stocker/stocker/utils/uservalidation/";
    postCreateUserUri: string = "http://localhost:8080/Stocker/stocker/utils/adduser";

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['login']);
  }
 
  login(user){
      localStorage.setItem("user", JSON.stringify(user.email));
      this._router.navigate(['dashboard']);      
      return true;
  }
 
   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['login']);
    }
    else {
        console.debug("Logged In");
        return localStorage.getItem("user");
    }
  } 

  private handleError(error: Response | any) {
      console.error('An error occurred', error); // for demo purposes only
      return Observable.throw(error.message || error);
  }

  getUser(user)  { 
    return this._http.get(this.userLoginUri + user.email + "," + user.password)
                  .map(res => res.json());
  }

  addUserPost(user) {
    var json = JSON.stringify( {"userFirstName":user.userFirstName
        , userLastName: user.userLastName, userTitle: user.userTitle, password: user.password, email:user.email, sessionID : '123'}
    );
    console.debug("Params");
    var headers = new Headers();
    headers.append('Content-Type','application/json');

    return this._http.post(this.postCreateUserUri, 
        json, {headers: headers})
        .map(res => res.json());
  }
}