import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  show$: Subject<boolean> = new Subject<boolean>();

  toggleLoader(show: boolean) {
    this.show$.next(show);
  }

}
