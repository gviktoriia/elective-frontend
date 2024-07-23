import { ElectiveService } from './../../../features/electives/electives.service';
import { Component, Inject, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-elective-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule, MatGridListModule, MatButtonModule ],
  templateUrl: './elective-form.component.html',
  styleUrl: './elective-form.component.css'
})
export class ElectiveFormComponent {
  @Input() elective: any = {};
  @Input() mode: 'add' | 'edit' = 'add';

  constructor(
    public dialogRef: MatDialogRef<ElectiveFormComponent>,
    private electiveService: ElectiveService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.elective = data.elective || {};
      this.mode = data.mode || 'add';
    }
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if(form.valid) {
      const { title, duration, lecture, lab, tutorial } = form.value;
      const electiveData = {
        title,
        duration,
        hours: {
          lecture,
          lab,
          tutorial
        }
      };

      if (this.mode === 'add') {
        this.electiveService.addElective(electiveData).subscribe(
          response => {
            console.log('Elective added successfully', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error adding elective', error);
            console.log(form.value);
          }
        )
      } else if (this.mode === 'edit') {
        this.electiveService.updateElective(this.elective._id, electiveData).subscribe(
          response => {
            console.log('Elective updated successfully', response);
            console.log(form.value);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error updating elective', error);
          }
        )
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
