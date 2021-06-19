import { Component, OnInit } from '@angular/core';
import { UserLoginServiceService } from '../user-login-service.service';
import { Router } from '@angular/router';
import { INote, Note } from '../note';
import { User } from '../user';
import { NoteserviceService } from '../noteservice.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public isLoggedIn = false;
  public startDate= new Date();
  public setRemainder = false;
  private user: User;
  private currentUserId:number = 0;
  
  newNote: Note = new Note(0,'','',this.startDate,false,this.startDate,0);
  notes: INote[] =[]
  
  constructor(private auth:UserLoginServiceService,
    private noteService:NoteserviceService,
    private router:Router,
    public dialog: MatDialog) 
  { 
    this.user = this.auth.currentUserValue
    if (this.user) { 
      this.isLoggedIn=true;
      console.log("--->",this.user);
      this.currentUserId=this.user.uid;
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

  onSubmit(){
    this.noteService.saveNote(this.newNote,this.currentUserId).pipe(first()).subscribe({
      next:(data)=> {console.log("Submitted"+data);this.getNotes(this.currentUserId)},
      error:(err)=>{console.log("Error"+err.status)}
    });
  }

  getNotes(uid:number){
    this.noteService.getNote(uid).pipe(first()).subscribe({
      next:(data) => { this.notes=data},
      error:(err)=>{console.log("Error"+err.status)}
    });
    console.log(this.notes);
  }

  deleteNote(nid:number){
    this.noteService.deleteNote(this.currentUserId,nid).pipe(first()).subscribe({
      next:(data) => {this.getNotes(this.currentUserId)},
      error:(err)=>{console.log("Error"+err.status)}
    });;
  }

  openDialog(note:Note) {
    const dialogRef = this.dialog.open(EditNoteComponent, {
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
