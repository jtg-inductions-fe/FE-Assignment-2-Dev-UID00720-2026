import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  User,
  UserApiResponse,
  LoggedInDeatils,
} from '@src/app/models/user.model';
import { usersUrl } from './auth.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storedUserData: string | null = localStorage.getItem('user');
  private parsedUser: LoggedInDeatils = this.storedUserData
    ? JSON.parse(this.storedUserData)
    : null;
  private isLoggedInSubject = new BehaviorSubject(this.parsedUser);
  isLoggedIn$: Observable<LoggedInDeatils> =
    this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Authenticates a user by verifying their email and password against the retrieved user list.
   * @param email
   * @param password
   * @returns An Observable emitting a UserApiResponse object containing the login status and a message.
   */
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
          profileUrl: user.profileUrl,
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
    this.isLoggedInSubject.next({ status: false });
  }

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(usersUrl);
  }
}
