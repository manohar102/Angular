import { Component, OnInit } from '@angular/core';
import {Hero} from '../Hero';
import {HEROES} from '../mock-heroes';
import { HeroService } from '../hero.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit  {

  heroes: Hero[] = [];

  selectedHero?: Hero;
  onSelect(hero:Hero): void{
    this.selectedHero=hero;
  }

  constructor(private heroService:HeroService ) { }

  getHeroes(): void{
    this.heroes=this.heroService.getHeroes();
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
