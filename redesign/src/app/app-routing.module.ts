import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignInFormComponent } from './components/users/UserSignInFormComponent/sign-in.component';
import { UserSignUpFormComponent } from './components/users/UserSignUpFormComponent/sign-up.component';
import { NotesDetailsComponent } from './components/notes/NoteDetailsComponent/notes.component';

const routes: Routes = [
  {path:"",redirectTo:"/login",pathMatch:"full"},
  {path:"login",component:UserSignInFormComponent},
  {path:"signup",component:UserSignUpFormComponent},
  {path:"notes",component:NotesDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
