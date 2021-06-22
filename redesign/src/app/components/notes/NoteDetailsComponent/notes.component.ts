import { Component, OnInit } from '@angular/core';
import { UserLoginServiceService } from '../../../services/user-login-service.service';
import { Router } from '@angular/router';
import { INote, Note } from '../../../models/note';
import { User } from '../../../models/user';
import { NoteserviceService } from '../../../services/noteservice.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteDialogComponent } from '../EditNoteDialogComponent/edit-note.component';
import { first } from 'rxjs/operators';
import { JwtResponseModel } from 'src/app/models/jwt-response-model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesDetailsComponent implements OnInit {

  public isLoggedIn = false;
  public startDate= new Date();
  public setRemainder = false;
  // private user: User;
  private jwtTokenModel:JwtResponseModel; 
  public currentUserId:number = 0;
  
  notes: INote[] =[]
  
  constructor(private auth:UserLoginServiceService,
    private noteService:NoteserviceService,
    private router:Router,
    public dialog: MatDialog) 
  { 
    this.jwtTokenModel = this.auth.currentUserValue
    if (this.jwtTokenModel) { 
      this.isLoggedIn=true;
      console.log("--->",this.jwtTokenModel);
      this.currentUserId=this.jwtTokenModel.uid;
    }
    else{
      this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
    this.getNotes(this.currentUserId);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }

  getNotes(uid:number){
    this.noteService.getNote(uid).pipe(first()).subscribe({
      next:(data) => { this.notes=data},
      error:(err)=>{console.log("Error"+err.status)}
    });
    console.log(this.notes);
  }

  getNotesCallBackFunction = (args:any): void =>{
    this.getNotes(this.currentUserId);
  }

  deleteNote(nid:number){
    this.noteService.deleteNote(this.currentUserId,nid).pipe(first()).subscribe({
      next:(data) => {this.getNotes(this.currentUserId)},
      error:(err)=>{console.log("Error"+err.status)}
    });;
  }

  openDialog(note:Note) {
    const dialogRef = this.dialog.open(EditNoteDialogComponent, {
      data: note,
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Result:",result);
      this.noteService.saveNote(result,this.currentUserId).pipe(first()).subscribe({
        next:(data)=> {console.log("Submitted"+data),this.getNotes(this.currentUserId)},
        error:(err)=>{console.log("Error"+err.status)}
      });
    });
  }

  
}
