import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}
export interface userApiResponse {
  status: boolean;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = '../../assets/db/users.json';

  constructor(private http: HttpClient) {}

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  login(email: string, password: string): Observable<userApiResponse> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          return {
            status: Boolean(user),
          };
        }
        return {
          status: Boolean(user),
          email: user.email,
          role: user.role,
        };
      })
    );
  }
}
