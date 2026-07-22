import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserApiResponse } from '@src/app/models/user.model';
import { usersUrl } from './auth.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    Boolean(localStorage.getItem('email'))
  );

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

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

        localStorage.setItem('email', user.email);
        localStorage.setItem('role', user.role);
        this.isLoggedInSubject.next(true);

        return {
          status: Boolean(user),
          message: 'login successful',
        };
      })
    );
  }

  logout() {
    localStorage.removeItem('email');
    this.isLoggedInSubject.next(false);
  }

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(usersUrl);
  }
}
