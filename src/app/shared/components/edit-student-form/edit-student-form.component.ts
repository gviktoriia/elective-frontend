import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from '../../../features/students/student.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-edit-student-form',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatGridListModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-student-form.component.html',
  styleUrl: './edit-student-form.component.css'
})
export class EditStudentFormComponent {
  constructor(
    public dialogRef: MatDialogRef<EditStudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {student: Student},
    private studentService: StudentService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.studentService.updateStudent(this.data.student._id as string, form.value).subscribe(
        response => {
          console.log('Student updated successfully', response);
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error updating student', error);
        }
      );
    }
  }

}
