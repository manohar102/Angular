import { Injectable } from '@angular/core';
import {Hero} from "./Hero";
import {HEROES} from "./mock-heroes";

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { users } from './Users';
import { Pipe } from '@angular/compiler/src/core';

@Injectable({providedIn: 'root'})
export class HeroService {

  private userUrl = 'http://localhost:8080/Employees';
  // private userUrl = '/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Host': 'http://localhost:4200/users' })
  };

  constructor( private http: HttpClient,
    private messageService:MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add("HeroService: fetched heroes");
    return heroes;
  }

  getHero(id:number): Observable<Hero>{
    const hero = HEROES.find(h=>h.id===id)!;
    this.messageService.add(`HeroService: fetched hero of is ${id}`);
    return of(hero);
  }

  getUsers(): Observable<users[]>{
    this.messageService.add("HeroService: Users data fetching....!");
    return this.http.get<users[]>(this.userUrl, this.httpOptions)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<users[]>('getUsers', []))
    );
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
    this.messageService.add(`HeroService: ${message}`);
  }
}
