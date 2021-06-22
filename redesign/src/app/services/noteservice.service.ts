import { Injectable } from '@angular/core';
import { INote, Note } from '../models/note';

import { BehaviorSubject,Observable,of,throwError } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Pipe } from '@angular/compiler/src/core';
import { catchError, map, tap } from 'rxjs/operators';
import { UserLoginServiceService } from './user-login-service.service';
import { JwtResponseModel } from '../models/jwt-response-model';

@Injectable({
  providedIn: 'root'
})
export class NoteserviceService {

  private server="http://127.0.0.1:8080/"
  private jwtTokenModel:JwtResponseModel; 
  private token:string ="";
  httpOptions = { };

  constructor(private httpClient:HttpClient,private auth:UserLoginServiceService) {
        this.jwtTokenModel = this.auth.currentUserValue;
        if(this.jwtTokenModel.uid>0){
          this.token = `Bearer ${this.jwtTokenModel.token}`;
          this.httpOptions = {
            headers: new HttpHeaders({ 'Authorization' : this.token })
          };
          console.log(this.httpOptions);
        }        
  }

  saveNote(note:Note,uid:number){
    console.log("Service Note:",note);
    const url = `${this.server}notes/save/${uid}`;
    console.log(url);
    return this.httpClient.post(url,note,this.httpOptions).
        pipe(
           map((data: any) => { 
             return data;
           }), 
           catchError( error => {
             return throwError( 'Something went wrong! Response code:'+error.status );
      })
    )
  }

  getNote(uid:number):Observable<INote[]>{
    console.log("Service_Login",uid);
    const url = `${this.server}notes/get/${uid}`;
    return this.httpClient.get<INote[]>(url,this.httpOptions)
        .pipe(
          map((data: any) => {
            console.log(data);
            return data;
          }), 
           catchError( error => {
             return throwError( 'Something went wrong! Response code:'+error.status );
      })
    )
  }

  editNote(note:Note,uid:number){
    console.log("Service Note:",note);
    const url = `${this.server}notes/update/${uid}`;
    console.log(url);
    return this.httpClient.put(url,note,this.httpOptions).
        pipe(
           map((data: any) => { 
             return data;
           }), 
           catchError( error => {
             return throwError( 'Something went wrong! Response code:'+error.status );
      })
    )
  }

  deleteNote(uid:number, nid:number){
    const url = `${this.server}notes/delete/${uid}/${nid}`;
    console.log(uid,nid);
    return this.httpClient.delete(url,this.httpOptions).
        pipe(
          map((data: any) => {
            console.log(data);
            return data;
          }), 
           catchError( error => {
             return throwError( 'Something went wrong! Response code:'+error.status );
      })
    )
  }

}
