import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  adminLogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/login`, { username, password })
      .pipe(tap(res => this.setSession(res.token)));
  }

  studentLogin(email: string, card: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/student/login`, { email, card })
      .pipe(tap(res => this.setSession(res.token)));
  }

  private setSession(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
