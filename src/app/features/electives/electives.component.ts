import { Component, OnInit } from '@angular/core';
import { Elective } from '../../models/elective.model';
import { ElectiveService } from './electives.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ElectiveFormComponent } from '../../shared/components/elective-form/elective-form.component';

@Component({
  selector: 'app-electives',
  standalone: true,
  imports: [NgFor, MatTableModule, MatButtonModule, HttpClientModule, CommonModule],
  templateUrl: './electives.component.html',
  styleUrl: './electives.component.css'
})
export class ElectivesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'duration', 'lecture', 'lab', 'tutorial', 'actions'];
  electives: Elective[] = [];

  constructor(
    private electiveService: ElectiveService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getElectives();
  }

  getElectives(): void {
    this.electiveService.getElectives().subscribe(data => {
      this.electives = data;
      console.log(this.electives);
    });
  }

  openAddElectiveModal(): void {
    const dialogRef = this.dialog.open(ElectiveFormComponent, {
      width: '400px',
      data: {
        mode: 'add'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getElectives(); // Refresh the student list if a student was added
      }
    });
  }

  updateElective(elective: Elective): void {
    const dialogRef = this.dialog.open(ElectiveFormComponent, {
      width: '400px',
      data: {mode: 'edit', elective}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getElectives();
      }
    })
  }

  deleteElective(id: string): void {
    console.log('Deleting student with ID:', id); // Check what ID is being passed
    this.electiveService.deleteElective(id).subscribe(() => {
      console.log('Student deleted successfully');
      this.getElectives(); // Refresh the student list
    }, error => {
      console.error('Error deleting student:', error);
    });
  }
}
