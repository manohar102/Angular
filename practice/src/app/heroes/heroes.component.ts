import { Component, OnInit } from '@angular/core';
import {Hero} from '../Hero';
import {HEROES} from '../mock-heroes';
import { HeroService } from '../hero.service';
import { ThrowStmt } from '@angular/compiler';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit  {

  heroes: Hero[] = [];
  
  constructor(private heroService:HeroService) { }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
