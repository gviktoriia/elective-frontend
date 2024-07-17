import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Student } from '../../models/student.model';
import { StudentService } from './student.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NgFor, CommonModule, MatTableModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'level', 'department', 'email', 'grade'];
  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }
}
