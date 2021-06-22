import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLoginServiceService } from '../../../services/user-login-service.service';
import { delay, first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class UserSignInFormComponent implements OnInit {

  public loginInvalid = false;
  private formSubmitAttempt = false;

  user: User ={uid:0,email:'',password:'',first_name:'',last_name:''};
  // private returnUrl: string;

  constructor(private auth:UserLoginServiceService, private router: Router) { 
      if(this.auth.currentUserValue) { 
        console.log(this.auth.currentUserValue)
        this.router.navigate(['/notes']);
      }
  }
  ngOnInit(): void {
    
  }
  onSubmit(){
    this.auth.processLogin(this.user).pipe(first())
    .subscribe({
      next: ()=> { this.router.navigate(['/notes']) },
      error:()=> {this.loginInvalid=true,setTimeout(()=>{ this.loginInvalid=false }, 2000) }
    });  
  }
}