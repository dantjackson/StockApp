import {Component, ElementRef} from '@angular/core';
import {AuthenticationService} from './auth.service'
import {User} from './user'

@Component({
    selector: 'login-form',
    providers: [AuthenticationService],
    template: `
        <div class="container col-sm-4">
          <form class="form-signin">
            <h2 class="form-signin-heading">Please sign in</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input [(ngModel)]="user.email" name="email" type="email" id="email" class="form-control" placeholder="Email address" required autofocus>
            <div style="margin-top:5px"></div>
            <label for="inputPassword" class="sr-only">Password</label>
            <input [(ngModel)]="user.password" name="password" type="password" id="password" class="form-control" placeholder="Password" required>
            
            <div *ngIf="showAddUser">
                <div style="margin-top:5px"></div>
                <label for="inputTitle" class="sr-only">Title</label>
                <input [(ngModel)]="user.userTitle" name="title" type="title" id="title" class="form-control" placeholder="Title" required>
                <div style="margin-top:5px"></div>
                <label for="inputFirstName" class="sr-only">First Name</label>
                <input [(ngModel)]="user.userFirstName" name="firstName" type="firstName" id="firstName" class="form-control" placeholder="FirstName" required>
                <div style="margin-top:5px"></div>
                <label for="inputLastName" class="sr-only">Last Name</label>
                <input [(ngModel)]="user.userLastName" name="lastName" type="lastName" id="lastName" class="form-control" placeholder="LastName" required>
            </div>

            <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
            </div>
            <div *ngIf="showSignIn">
                <button (click)="LoginUserClick()" class="btn btn-lg btn-success btn-block" type="submit">Sign in</button>
            </div>    
            <div *ngIf="errorMsg" class="row">
                    <h4 class="text-red">{{errorMsg}}</h4>
            </div>  

            <div style="margin-top:20px"></div>
            <div *ngIf="showSignIn">
                <button (click)="createUserClick()" class="btn btn-lg btn-primary btn-block">Create New User</button>
            </div> 
            <div style="margin-top:20px"></div>    
            <div *ngIf="showAddUser">
                <button (click)="addUserClick()" class="btn btn-lg btn-info btn-block">Add User</button>
            </div>

            <div class="row" *ngIf="showLoginRespMessage">
                <div style="margin-top:10px"></div>
                <table>
                    <tr *ngFor="let user of retUser ">
                        <td class="h4">{{user.userMessage}}</td>
                    </tr>
                </table>     
            </div>   
           </form>  
         </div>      
    	`
})
 
export class LoginComponent {
 
    public user = new User('','','','','',false,'','','');
    public retUser:User = new User('test@gmail.com','welcome1','','','',false,'','','');
    public errorMsg = '';
    showLoginRespMessage:boolean = false;
    showAddUser:boolean = false;
    showSignIn:boolean = true;
    public postData :string;
 
    constructor(
        private _service:AuthenticationService) {}
 
    LoginUserClick() {
        this._service.getUser(this.user)
            .subscribe(
                data => this.retUser = data,
                error => alert(error),
                () =>this.login()
            );
    }

    login() {
        console.log(this.retUser);
        if (this.retUser[0].userValidated) {
            if(!this._service.login(this.user)){
                this.errorMsg = 'Problem Logging In';
            }
        }
        else {
            this.errorMsg = this.retUser[0].userMessage;
        }
    }

    showMessage() {
        this.showLoginRespMessage = true;
        this.showAddUser = false;
        this.showSignIn = true;        
        console.log(this.retUser[0].userMessage);
    }    

    createUserClick() {
        this.showAddUser = true;
        this.showSignIn = false;
    }

    addUserClick() {
        this._service.addUserPost(this.user)
            .subscribe(
                data => this.retUser = data,
                error => alert(error),
                () =>this.showMessage()
            );
    }
}