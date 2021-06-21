import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Note } from 'src/app/note';
import { NoteserviceService } from 'src/app/noteservice.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

  @Input() currentUserId:number = 0 ;
  @Input() getNotesFunction!: (args: any) => void;

  public startDate= new Date();
  newNote: Note = new Note(0,'','',this.startDate,false,this.startDate,0);

  constructor(private noteService:NoteserviceService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.noteService.saveNote(this.newNote,this.currentUserId).pipe(first()).subscribe({
      next:(data)=> {console.log("Submitted"+data);this.getNotesFunction(this.currentUserId);},
      error:(err)=>{console.log("Error"+err.status)}
    });
  }

}
