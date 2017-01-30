import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Headers, Http, Response } from '@angular/http';

export class User {
  constructor(
    public email: string,
    public password: string) { }
}
 
var users = [
    new User('admin@admin.com','welcome1'),
    new User('test@gmail.com','welcome1')
];

@Injectable()
export class AuthenticationService {
 
  constructor(
    private _router: Router, private _http: Http){}
 
  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['login']);
  }
 
  login(user){
    var authenticatedUser = users.find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password){
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      this._router.navigate(['dashboard']);      
      return true;
    }
    return false;
 
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

  addUserPost() {
    var json = JSON.stringify( {"userFirstName":'Dan'
        , userLastName: 'J', userTitle: 'Mr', password: '1234', email:'123@123.com', sessionID : '123'}
    );
    console.debug("Params");
    var headers = new Headers();
    headers.append('Content-Type','application/json');

    return this._http.post('http://localhost:8080/Stocker/stocker/utils/adduser', 
        json, {headers: headers})
        .map(res => res.json());
  }
}