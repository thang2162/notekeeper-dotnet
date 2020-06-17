import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { AccountService } from '../../account.service';
import { LoaderService } from '../../components/loader/loader.service';
import { Note } from "../../note";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit, OnDestroy {
  notes: Note[] = [];

  private httpSubs: Subscription[] = [];

  faPlusSquare = faPlusSquare;

  newNoteTitle: string = null;
  newNoteNote: string = null;

  editNoteTitle: string = null;
  editNoteNote: string = null;

  newNoteModal: string = '';
  editNoteModal: string = '';
  confirmModal: string = '';
  notifyModal: string = '';

  notifyTitle: string;
  notifyBody: string;

  showLoadingBar: boolean = true;
  showNotification: boolean = true;
  message: string = 'Test Note'

  note_id: string;

  refreshPage: boolean = false;

  validateNewNoteTitle: string = '';
  validateNewNoteNote: string = '';

  disableNewNoteSubmit: boolean = true;

  validateNewNoteForm (field: string) {
    if (field === 'title') {
      if (this.newNoteTitle !== '' && this.newNoteTitle !== null) {
        this.validateNewNoteTitle = "is-success"

        if (this.newNoteNote !== '' && this.newNoteNote !== null) {
          this.disableNewNoteSubmit = false;
        } else {
          this.disableNewNoteSubmit = true;
        }
      } else {
        this.validateNewNoteTitle = "is-danger"
        this.disableNewNoteSubmit = true;
      }
    } else if (field === 'note') {
      if (this.newNoteNote !== '' && this.newNoteNote !== null) {
        this.validateNewNoteNote = "is-success"

        if (this.newNoteTitle !== '' && this.newNoteTitle !== null) {
          this.disableNewNoteSubmit = false;
        } else {
          this.disableNewNoteSubmit = true;
        }
      } else {
        this.validateNewNoteNote = "is-danger"
        this.disableNewNoteSubmit = true;
      }
    }
  }

  validateEditNoteTitle: string = '';
  validateEditNoteNote: string = '';

  disableEditNoteSubmit: boolean = true;

  validateEditNoteForm (field: string) {
    if (field === 'title') {
      if (this.editNoteTitle !== '' && this.editNoteTitle !== null) {
        this.validateEditNoteTitle = "is-success"

        if (this.editNoteNote !== '' && this.editNoteNote !== null) {
          this.disableEditNoteSubmit = false;
        } else {
          this.disableEditNoteSubmit = true;
        }
      } else {
        this.validateEditNoteTitle = "is-danger"
        this.disableEditNoteSubmit = true;
      }
    } else if (field === 'note') {
      if (this.editNoteNote !== '' && this.editNoteNote !== null) {
        this.validateEditNoteNote = "is-success"

        if (this.editNoteTitle !== '' && this.editNoteTitle !== null) {
          this.disableEditNoteSubmit = false;
        } else {
          this.disableEditNoteSubmit = true;
        }
      } else {
        this.validateEditNoteNote = "is-danger"
        this.disableEditNoteSubmit = true;
      }
    }
  }

  getNotes (): void {
    this.httpSubs.push(this.accountService.getNotes()
    .subscribe(notes => this.notes = notes));
  }

  newNote () {
    this.newNoteTitle = null;
    this.newNoteNote = null;
    this.newNoteModal = 'is-active';
  }

  deleteNote (note_id: string): void {
    this.note_id = note_id;
    this.confirmModal = 'is-active';
  }

  confirmDeleteNote (): void {
    this.closeModal();
    this.loaderService.toggleLoader(true);
    this.httpSubs.push(this.accountService.deleteNote(this.note_id)
      .subscribe(res => {
        this.loaderService.toggleLoader(false);

        if(res.status === 'success') {
          this.refreshPage = true;
          this.notifyTitle = "Note Deleted";
          this.notifyBody = res.msg;
          this.notifyModal = 'is-active';
        } else {
          this.notifyTitle = "Error";
          this.notifyBody = res.msg;
          this.notifyModal = 'is-active';
        }

      }));
  }

  confirmNewNote (): void {
    this.closeModal();
    this.loaderService.toggleLoader(true);
    this.httpSubs.push(this.accountService.newNote(this.newNoteTitle, this.newNoteNote)
      .subscribe(res => {
        this.loaderService.toggleLoader(false);

        if(res.status === 'success') {
          this.refreshPage = true;
          this.notifyTitle = "Note Saved";
          this.notifyBody = res.msg;
          this.notifyModal = 'is-active';
        } else {
          this.notifyTitle = "Error";
          this.notifyBody = res.msg;
          this.notifyModal = 'is-active';
        }

      }));
  }

  editNote (note_id: string) {
    this.note_id = note_id;
    this.editNoteTitle = null;
    this.editNoteNote = null;
    this.editNoteModal = 'is-active';
  }

  confirmEditNote (): void {
    this.closeModal();
    this.loaderService.toggleLoader(true);
    this.httpSubs.push(this.accountService.editNote(this.editNoteTitle, this.editNoteNote, this.note_id)
      .subscribe(res => {
        this.loaderService.toggleLoader(false);

        if(res.status === 'success') {
          this.refreshPage = true;
          this.notifyTitle = "Note Edited";
          this.notifyBody = res.msg;
          this.notifyModal = 'is-active';
        } else {
          this.notifyTitle = "Error";
          this.notifyBody = res.msg;
          this.notifyModal = 'is-active';
        }

      }));
  }

  closeModal () {
    this.newNoteModal = '';
    this.editNoteModal = '';
    this.confirmModal = '';
    this.notifyModal = '';

    if (this.refreshPage === true) {
      this.refreshPage = false;
      this.getNotes();
    }
  }

  constructor(
    private accountService: AccountService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getNotes();

    if(!this.accountService.sessionCheck()) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnDestroy(){
    this.httpSubs.forEach(sub => sub.unsubscribe());
  }

}
