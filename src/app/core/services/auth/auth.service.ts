import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavStateService } from '@core/services/sidenav-state/sidenav-state.service';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface UserApiResponse {
  status: boolean;
  message: string;
}
export interface LoggedInDeatils {
  status: boolean;
  name?: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private rawData = localStorage.getItem('user');
  private userDataLocalStorage = this.rawData ? JSON.parse(this.rawData) : null;
  private usersUrl = 'assets/db/users.json';
  private isLoggedInSubject = new BehaviorSubject<LoggedInDeatils>(
    this.userDataLocalStorage
  );
  isLoggedIn$: Observable<LoggedInDeatils> =
    this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private sidenavService: SidenavStateService
  ) {}

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  login(email: string, password: string): Observable<UserApiResponse> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(
          u => u.email === email && u.password === password
        );

        if (!user) {
          return {
            status: Boolean(user),
            message: 'invalid credentials',
          };
        }
        const loginStatus = {
          status: true,
          name: user.name,
          email: user.email,
          role: user.role,
        };
        localStorage.setItem('user', JSON.stringify(loginStatus));
        this.isLoggedInSubject.next(loginStatus);

        return {
          status: Boolean(user),
          message: 'login successful',
        };
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.sidenavService.setOpen(false);
    this.isLoggedInSubject.next({ status: false });
  }
}
