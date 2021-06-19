import { Injectable } from '@angular/core';
import { INote, Note } from './note';
import { NOTES } from 'note_details';

import { BehaviorSubject,Observable,of,throwError } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Pipe } from '@angular/compiler/src/core';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteserviceService {

  private server="http://127.0.0.1:8080/"

  constructor(private httpClient:HttpClient) { }

  saveNote(note:Note,uid:number){
    console.log("Service Note:",note);
    const url = `${this.server}notes/${uid}/save`;
    console.log(url);
    return this.httpClient.post(url,note).
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
    const url = `${this.server}notes/getNotes/${uid}`;
    return this.httpClient.get<INote[]>(url).
        pipe(
          map((data: any) => {
            console.log(data.notes);
            return data.notes;
          }), 
           catchError( error => {
             return throwError( 'Something went wrong! Response code:'+error.status );
      })
    )
  }

  editNote(note:Note){
    console.log("Service edit note:",note);
  }

  deleteNote(uid:number, nid:number){
    const url = `${this.server}/notes/delete/${uid}/${nid}`;
    return this.httpClient.delete(url).
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
