import { Score } from './../../../models/curriculum.model';
import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CurriculumService } from '../../../features/curriculum/curriculum.service';

@Component({
  selector: 'app-edit-curriculum-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule, MatGridListModule, MatButtonModule, 
    CommonModule, MatIconButton, ReactiveFormsModule, MatIconModule ],
  templateUrl: './edit-curriculum-form.component.html',
  styleUrl: './edit-curriculum-form.component.css'
})
export class EditCurriculumFormComponent {
  @Input() curriculum: any = {};
  curriculumForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCurriculumFormComponent>,
    private curriculumService: CurriculumService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.curriculumForm = this.fb.group({
      student_id: this.fb.group({
        _id: [''],
        name: [''],
        department: [''],
        level: [''],
        email: [''],
        card: ['']
      }),
      elective_id: this.fb.group({
        _id: [''],
        title: [''],
        hours: this.fb.group({
          lecture: [''],
          lab: [''],
          tutorial: ['']
        }),
        duration: ['']
      }),
      scores: this.fb.array([]),
      final_score: ['']
    });

    if (data && data.curriculum) {
      const { student_id, elective_id, scores, final_score } = data.curriculum;

      this.curriculumForm.patchValue({
        student_id,
        elective_id,
        final_score
      });

      if (scores) {
        scores.forEach((score: { _id: string; score: number; date: string }) => {
          this.addScore({
            _id: score._id,
            score: score.score,
            date: new Date(score.date).toISOString().split('T')[0] // Convert Date to YYYY-MM-DD string
          });
        });
      }
    }
  }

  get scores() {
    return this.curriculumForm.get('scores') as FormArray;
  }

  addScore(score?: { _id: string, score: number, date: string }) {
    this.scores.push(this.fb.group({
      _id: [score ? score._id : ''],
      score: [score ? score.score : '', Validators.required],
      date: [score ? score.date : '', Validators.required] // Expecting string here
    }));
  }

  removeScore(index: number) {
    this.scores.removeAt(index);
  }

  onSubmit() {
    if (this.curriculumForm.valid) {
      const curriculumData = this.curriculumForm.value;
      
      // Convert date strings back to Date objects
      curriculumData.scores = curriculumData.scores.map((score: { _id: string; score: number; date: string }) => ({
        _id: score._id,
        score: score.score,
        date: new Date(score.date) // Convert string back to Date object
      }));

      const id = this.curriculumForm.get('_id')?.value;

    if (id) {
      this.curriculumService.updateCurriculum(id, curriculumData).subscribe(
        response => {
          console.log('Curriculum updated successfully', response);
          this.dialogRef.close(true);
        },
        error => console.error('Error updating curriculum', error)
      );
    } else {
      console.error('ID is null or undefined');
    }
  }
}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
