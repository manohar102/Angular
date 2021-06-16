import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { users } from '../Users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private heroServce:HeroService) { }

  users: users[] = [];

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.heroServce.getUsers().subscribe(users=>this.users=users);
  }

}
