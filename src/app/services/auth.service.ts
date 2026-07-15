import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private usersUrl = 'assets/db/users.json';
  private isLoggedInSubject = new BehaviorSubject<boolean>(Boolean(localStorage.getItem('user')));

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  login(email: string, password: string): Observable<UserApiResponse> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
          return {
            status: Boolean(user),
            message: 'invalid credentials',
          };
        }

        localStorage.setItem(
          'user',
          JSON.stringify({
            name: user.name,
            email: user.email,
            role: user.role,
          })
        );
        this.isLoggedInSubject.next(true);

        return {
          status: Boolean(user),
          message: 'login successful',
        };
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }
}
