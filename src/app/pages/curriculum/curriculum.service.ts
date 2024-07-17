import { Curriculum } from './../../models/curriculum.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private registrations: Curriculum[] = [
    { id: 1, studentId: 1, electiveId: 1, scores: [85, 90], finalScore: 90 },
    { id: 2, studentId: 2, electiveId: 2, scores: [75, 80], finalScore: 80 },
    { id: 3, studentId: 3, electiveId: 3, scores: [95, 85], finalScore: 85 },
  ];

  constructor() { }

  getRegistrations(): Observable<Curriculum[]> {
    return of(this.registrations);
  }

  addScore(registrationId: number, score: number): void {
    const registration = this.registrations.find(reg => reg.id === registrationId);
    if (registration) {
      registration.scores.push(score);
      registration.finalScore = score; // Update the final score to the latest score
    }
  }
}
