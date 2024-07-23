import { ElectiveService } from './../electives/electives.service';
import { CurriculumService } from './curriculum.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Component, numberAttribute } from '@angular/core';
import { Curriculum } from '../../models/curriculum.model';
import { CommonModule, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Elective } from '../../models/elective.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [NgFor, MatTableModule, MatButtonModule, HttpClientModule, CommonModule],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {
  displayedColumns: string[] = ['title', 'duration', 'students'];
  curriculum: Curriculum[] = [];
  elective: Elective[] = [];
  students: any[] = [];

  constructor(
    private curriculumService: CurriculumService,
    private electiveService: ElectiveService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getElectivesList();
    this.fetchElectiveStudentCounts();
  }

  getElectivesList(): void {
    this.electiveService.getElectives().subscribe(data => {
      this.elective = data;
      console.log(this.elective);
    })
  }

  getCurriculum(): void {
    this.curriculumService.getCurriculums().subscribe(data => {
      this.curriculum = data;
      console.log(this.curriculum);
    });
  }

  goToDetails(elective: Elective): void {
    this.router.navigate(['/elective', elective._id])
  }

  fetchElectiveStudentCounts(): void {
    this.curriculumService.getElectiveStudentCounts().subscribe(
      (data) => {
        // Format data if necessary
        this.students = data;
      },
      (error) => {
        console.error('Error fetching student counts:', error);
      }
    );
  }

}
