import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl  } from '@angular/forms';
import { User } from '../../../models/user';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { UserLoginServiceService } from '../../../services/user-login-service.service';
import { delay, first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class UserSignUpFormComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  public registrationCompleted = false;
  private hasErrors=true;
  user: User ={uid:0,email:'',password:'',first_name:'',last_name:""};

  constructor(private fb:FormBuilder,private auth:UserLoginServiceService,private router:Router) {
    console.log("signip")
    this.form=this.fb.group({
      first_name: ['',[Validators.required,Validators.nullValidator]],
      last_name: ['',[Validators.required,Validators.nullValidator]],
      email: ['',[Validators.required,Validators.email,Validators.nullValidator]],
      password: ['', [Validators.required,Validators.nullValidator]],
      confirm_password: ['',  [Validators.required,Validators.nullValidator]],
    }, { validators: this.identityRevealedValidator });
   }

  // passwordMatchValidator(frm: FormGroup){
  //   return frm.controls['password'] === frm.controls['cpassword'] ? null : { confirmedValidator: true };
  // }
  identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get('password');
    const cpass = control.get('confirm_password');

    console.log(pass,cpass);

    if(pass?.errors===null && cpass?.errors===null){
      if(pass?.value!==cpass?.value){
        return { passwordMisMatch: true };
      }
    }
  
    return null;
  };

  ngOnInit(): void {
  }

  onSubmit(){
      if(this.form.value.password === this.form.value.confirm_password){
        this.auth.processRegister(this.form.value).pipe(first()).subscribe({
            next:(data) => {this.registrationCompleted=true,setTimeout(()=>{ this.router.navigate(['/']) }, 2000)},
            error:()=>{this.loginInvalid=true,setTimeout(()=>{ this.loginInvalid=false }, 2000)}
        });
      }
      
  }
}
