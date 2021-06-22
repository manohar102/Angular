import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject,Observable,of,throwError } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Pipe } from '@angular/compiler/src/core';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtResponseModel } from '../models/jwt-response-model';

@Injectable({
  providedIn: 'root'
})
export class UserLoginServiceService {

  private currentUserSubject: BehaviorSubject<JwtResponseModel>;
  public currentUser: Observable<JwtResponseModel>;

  private server="http://127.0.0.1:8080/"

  constructor(private httpClient:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<JwtResponseModel>(JSON.parse(localStorage.getItem("isLoggedIn")|| '0'));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUser,this.currentUserSubject.value);
  }

  public get currentUserValue(): JwtResponseModel {
      return this.currentUserSubject.value;
  }

  model: User = {uid:1, first_name:'Mnaohar',last_name:'Krishna',password:'mmkkk',email:"manoharkrishna@testsigma.com"}

  processLogin(user:User){
    console.log("Service_Login",user);
    // if(user.email===this.model.email && user.password===this.model.password){
    //   localStorage.setItem("isLoggedIn", JSON.stringify(this.model));
    //   sessionStorage.setItem("mano",JSON.stringify(this.model));
    //   this.currentUserSubject.next(this.model);  
    //   console.log(this.currentUser,this.currentUserSubject.value);
    //   return user;
    // }
    const url = `${this.server}`+"authenticate";
    return this.httpClient.post(url,user).
        pipe(
           map((data: any) => {
             console.log("maaa-->",data);
            localStorage.setItem("isLoggedIn", JSON.stringify(data));
            sessionStorage.setItem("JwtSession",JSON.stringify(data));
            this.currentUserSubject.next(data);
            return data;
           }), 
           catchError( 
             error => {return throwError( 'Something went wrong! Response code:'+error.status );
          })
        )
  }

  processRegister(user:User):Observable<number>{
    console.log("Service_Login",user);
    const url = `${this.server}`+"register";
    return this.httpClient.post(url,user).
        pipe(
           map((data: any) => {
             return data;
           }), 
           catchError( error => {
             return throwError( 'Something went wrong! Response code:'+error.status );
      })
    )
  }


  logout(){
    sessionStorage.removeItem("JwtSession");
    localStorage.removeItem("isLoggedIn");
    this.currentUserSubject.next(JSON.parse('0'));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
   console.log(`HeroService: ${message}`);
  }

}
