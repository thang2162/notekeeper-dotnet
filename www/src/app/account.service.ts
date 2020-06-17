import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Note } from './note';

@Injectable({ providedIn: 'root' })
export class AccountService {

  loggedIn$: Subject<boolean> = new Subject<boolean>();

  private apiUrl = 'https://dotnet-notekeeper.bithatchery.com/api/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'authorization': sessionStorage.jwt ? 'bearer ' + sessionStorage.jwt : '' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET Notes from the server */
  getNotes (): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + 'pvt/getNotes', this.httpOptions)
      .pipe(
        tap(res => {
          console.log(JSON.stringify(res))
        })
      );
  }

  /** Reset Password */
  resetPw (email: string, key: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'pub/resetPw', {email: email, password: password, key: key}, {}).pipe(
      tap(res => {
        console.log(JSON.stringify(res))
      })
    );
  }

  /** Request Password Reset */
  reqResetPw (email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'pub/reqPwReset', {email: email}, {}).pipe(
      tap(res => {
        console.log(JSON.stringify(res))
      })
    );
  }

  /** Create a new user */
  newUser (email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'pub/newUser', {email: email, password: password}, {}).pipe(
      tap(res => {
        console.log(JSON.stringify(res))
      })
    );
  }

  /** Login a user */
  loginUser (email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'pub/userLogin', {email: email, password: password}, {}).pipe(
      tap(res => {
        if(res.jwt) {
          console.log(res.jwt);
          sessionStorage.jwt = res.jwt;
          this.httpOptions.headers = new HttpHeaders({ 'authorization': 'bearer ' +  sessionStorage.jwt });
          this.sessionCheck();
        }
        console.log(JSON.stringify(res))
      })
    );
  }

  /** Edit Note */
  editNote (title: string, note: string, note_id: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'pvt/editNote', {title: title, note: note, note_id: note_id}, this.httpOptions).pipe(
      tap(res => {
        console.log(JSON.stringify(res))
      })
    );
  }

  /** New Note */
  newNote (title: string, note: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'pvt/newNote', {title: title, note: note}, this.httpOptions).pipe(
      tap(res => {
        console.log(JSON.stringify(res))
      })
    );
  }

  /** Deletes a Note */
  deleteNote (note_id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'pvt/deleteNote/' + note_id, this.httpOptions).pipe(
      tap(res => {
        console.log(JSON.stringify(res))
      })
    );
  }

  /** Deletes a user */
  deleteUser (): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'pvt/deleteUser', this.httpOptions).pipe(
      tap(res => {
        console.log(JSON.stringify(res))
      })
    );
  }

  /** Change Password */
  changePassword (oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'pvt/changePassword', {oldPassword: oldPassword, newPassword: newPassword}, this.httpOptions).pipe(
      tap(res => {
        console.log(JSON.stringify(res))
      })
    );
  }

  /** Clears the session */
  clearSession () {
    sessionStorage.clear();
    this.loggedIn$.next(false);
  }

  /** Checks and broadcasts user session status */
  sessionCheck () {
    if(sessionStorage.jwt &&  sessionStorage.jwt !== undefined && sessionStorage.jwt !== null) {
      this.httpOptions.headers = new HttpHeaders({ 'authorization': 'bearer ' +  sessionStorage.jwt });
      this.loggedIn$.next(true);
      return true;
    } else {
      this.loggedIn$.next(false);
      return false;
    }
  }


}
