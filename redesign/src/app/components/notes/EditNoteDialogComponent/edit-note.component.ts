import { Component, Inject, Input, OnInit } from '@angular/core';
import { INote, Note } from '../../../models/note';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteDialogComponent{

  public startDate = new Date();

  constructor(public dialogRef: MatDialogRef<EditNoteDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: INote ) { 

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
