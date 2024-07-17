import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [
    { id: 1, name: 'John Doe', level: 2, department: "FI", email: "john.doe@ukma.edu.ua", grade: 'A' },
    { id: 2, name: 'John Doe', level: 2, department: "FI", email: "john.doe@ukma.edu.ua", grade: 'A'  },
    { id: 3, name: 'John Doe', level: 2, department: "FI", email: "john.doe@ukma.edu.ua", grade: 'A'  },
    { id: 4, name: 'John Doe', level: 2, department: "FI", email: "john.doe@ukma.edu.ua", grade: 'A'  },
  ];

  constructor() { }

  getStudents(): Observable<Student[]> {
    return of(this.students);
  }
}
