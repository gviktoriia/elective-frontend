import { HttpClient } from '@angular/common/http';
import { Curriculum } from '../../models/curriculum.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Elective } from '../../models/elective.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCurriculums(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.apiUrl);
  }

  getElectiveById(id: string): Observable<Elective> {
    return this.http.get<Elective>(`${this.apiUrl}/electives/${id}`);
  }

  getStudentsByElective(electiveId: string): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(`${this.apiUrl}/curriculum?elective_id=${electiveId}`);
  }

  createCurriculum(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.post<Curriculum>(`${this.apiUrl}/curriculum`, curriculum);
  }

  updateCurriculum(id: string, curriculum: Curriculum): Observable<any> {
    return this.http.patch(`${this.apiUrl}/curriculum/${id}`, curriculum);
  }

  deleteCurriculum(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/curriculum/${id}`);
  }


  // getElectiveStudentCounts(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/curriculum/student-counts`);
  // }


}
