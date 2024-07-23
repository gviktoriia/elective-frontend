import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Elective } from '../../models/elective.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElectiveService {
  private apiUrl = 'http://localhost:3000/electives';

  constructor(private http: HttpClient) {}

  getElectives(): Observable<Elective[]> {
    return this.http.get<Elective[]>(this.apiUrl);
  }

  getElectiveById(id: string): Observable<Elective> {
    return this.http.get<Elective>(`${this.apiUrl}/${id}`)
  }

  addElective(elective: Elective): Observable<Elective> {
    return this.http.post<Elective>(this.apiUrl, elective);
  }

  updateElective(id: string, elective: Elective): Observable<Elective> {
    return this.http.patch<Elective>(`${this.apiUrl}/${id}`, elective);
  }       

  deleteElective(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
