import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  setIsLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
