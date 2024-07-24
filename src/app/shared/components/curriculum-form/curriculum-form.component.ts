import { Component, Inject, Input } from '@angular/core';
import { CurriculumService } from '../../../features/curriculum/curriculum.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-curriculum-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule, MatGridListModule, MatButtonModule, CommonModule, MatOptionModule ],
  templateUrl: './curriculum-form.component.html',
  styleUrl: './curriculum-form.component.css'
})
export class CurriculumFormComponent {
  @Input() curriculum: any = {};

  constructor(
    public dialogRef: MatDialogRef<CurriculumFormComponent>,
    private curriculumService: CurriculumService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.curriculum = data.curriculum || {};
    } 
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const curriculumData = form.value;
      console.log(curriculumData);
      this.curriculumService.createCurriculum(curriculumData).subscribe(
        response => {
          console.log('Curriculum added successfully', response);
          this.dialogRef.close(true);
        },
        error => console.error('Error adding curriculum', error)
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
