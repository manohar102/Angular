import { Component, OnInit } from '@angular/core';
import { UserLoginServiceService } from 'src/app/services/user-login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.scss']
})
export class NavbarComponentComponent implements OnInit {

  constructor(private auth:UserLoginServiceService,private router:Router ) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
