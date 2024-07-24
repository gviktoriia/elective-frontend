import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  loggedIn!: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  }

  adminLogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/login`, { username, password })
      .pipe(tap(res => this.setSession(res.token, 'admin')));
  }

  studentLogin(email: string, card: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/student/login`, { email, card })
      .pipe(tap(res => this.setSession(res.token, 'student')));
  }

  private setSession(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAuthorized(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isStudent(): boolean {
    return this.getRole() === 'student';
  }
  
}
