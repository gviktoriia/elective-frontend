import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../models/student.model';
import { StudentService } from './student.service';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../../shared/components/student-form/student-form.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NgFor, CommonModule, MatTableModule, MatButtonModule, HttpClientModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'department', 'level', 'email', 'card', 'actions'];
  students: Student[] = [];

  constructor(
    private studentService: StudentService, 
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      console.log(this.students);
    });
  }

  openAddStudentModal(): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '400px',
      data: {
        mode: 'add'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getStudents(); // Refresh the student list if a student was added
      }
    });
  }

  updateStudent(student: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '400px',
      data: {mode: 'edit', student}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getStudents();
      }
    })
  }

  deleteStudent(id: string): void {
    console.log('Deleting student with ID:', id); // Check what ID is being passed
    this.studentService.deleteStudent(id).subscribe(() => {
      console.log('Student deleted successfully');
      this.getStudents(); // Refresh the student list
    }, error => {
      console.error('Error deleting student:', error);
    });
  }
  
}
