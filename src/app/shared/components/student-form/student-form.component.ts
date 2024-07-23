import { Component, Inject, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from '../../../features/students/student.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, NgFor, FormsModule, MatDialogModule, MatGridListModule, MatButtonModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  @Input() student: any = {};
  @Input() mode: 'add' | 'edit' = 'add';

  constructor(
    public dialogRef: MatDialogRef<StudentFormComponent>,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.student = data.student || {};
      this.mode = data.mode || 'add';
    }
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if(form.valid) {
      if (this.mode === 'add') {
        this.studentService.addStudent(form.value).subscribe(
          response => {
            console.log('Student added successfully', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error adding student', error);
          }
        )
      } else if (this.mode === 'edit') {
        this.studentService.updateStudent(this.student._id, form.value).subscribe(
          response => {
            console.log('Student updated successfully', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error updating student', error);
          }
        )
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
