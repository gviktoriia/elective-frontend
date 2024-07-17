import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Elective } from '../../models/elective.model';

@Injectable({
  providedIn: 'root'
})
export class ElectiveService {
  private electives: Elective[] = [
    { id: 1, title: 'Advanced Mathematics', hours: { lecture: 3, lab: 1, tutorial: 1 }, duration: 2 },
    { id: 2, title: 'Ukrainian Literature', hours: { lecture: 5, lab: 2, tutorial: 3 }, duration: 1 },
    { id: 3, title: 'Physical Education', hours: { lecture: 0, lab: 4, tutorial: 2 }, duration: 1 },

  ];

  constructor() { }

  getElectives(): Observable<Elective[]> {
    return of(this.electives);
  }
}
