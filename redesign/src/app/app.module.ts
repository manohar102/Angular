import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserSignInFormComponent } from './components/users/UserSignInFormComponent/sign-in.component'
import { UserSignUpFormComponent } from './components/users/UserSignUpFormComponent/sign-up.component';
import { NotesDetailsComponent } from './components/notes/NoteDetailsComponent/notes.component';
import { EditNoteDialogComponent } from './components/notes/EditNoteDialogComponent/edit-note.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule} from '@angular/material/tooltip';
import { NavbarComponentComponent } from './components/navbar/navbar-component/navbar-component.component';
import { NoteFormComponent } from './components/notes/NoteFormComponent/note-form.component';

const materialComponents=[
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatTooltipModule
]

@NgModule({
  declarations: [
    AppComponent,
    UserSignUpFormComponent,
    UserSignInFormComponent,
    NavbarComponentComponent,
    NotesDetailsComponent,
    EditNoteDialogComponent,
    NoteFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    materialComponents,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
