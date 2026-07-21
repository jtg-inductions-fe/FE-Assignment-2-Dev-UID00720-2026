import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavStateService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

  toggle() {
    const currentValue = this.isOpenSubject.getValue();
    this.isOpenSubject.next(!currentValue);
  }

  setOpen(state: boolean) {
    this.isOpenSubject.next(state);
  }
}
