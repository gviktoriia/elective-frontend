import { MatInputModule } from '@angular/material/input';
import { StudentService } from '../../../features/students/student.service';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-student-form',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatGridListModule, MatDialogModule, MatButtonModule],
  templateUrl: './add-student-form.component.html',
  styleUrl: './add-student-form.component.css'
})
export class AddStudentFormComponent {
  constructor(
    public dialogRef: MatDialogRef<AddStudentFormComponent>,
    private studentService: StudentService
  ) {}

  onSubmit(form: NgForm) {
    if(form.valid) {
      this.studentService.addStudent(form.value).subscribe(
        response => {
          console.log('Student added successfully', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error adding student', error);
        }
      )
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
