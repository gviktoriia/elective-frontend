import { CurriculumService } from './../curriculum/curriculum.service';
import { Student } from './../../models/student.model';
import { ElectiveService } from './../electives/electives.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Elective } from '../../models/elective.model';
import { Curriculum, Score } from '../../models/curriculum.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-elective-details',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './elective-details.component.html',
  styleUrl: './elective-details.component.css'
})
export class ElectiveDetailsComponent implements OnInit {
  electiveId!: string;
  elective!: Elective;
  students: Curriculum[] = [];
  displayedColumns: string[] = ['name', 'email', 'scores', 'final_score'];


  constructor(
    private route: ActivatedRoute,
    private electiveService: ElectiveService,
    private curriculumService: CurriculumService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.electiveId = params.get('id')!;
      this.getElectiveDetails();
      this.fetchRegisteredStudents();
    });
  }

  getElectiveDetails(): void {
    this.electiveService.getElectiveById(this.electiveId).subscribe((elective) => {
      this.elective = elective;
    });
  }

  fetchRegisteredStudents(): void {
    this.curriculumService.getStudentsByElective(this.electiveId).subscribe(
      (students) => {
        console.log('Fetched students:', students); // Debugging line
        this.students = students.map(student => ({
          ...student,
          scoreString: student.scores.map(score => score.score).join(', ')
        }));
      },
      (error) => {
        console.error('Error fetching students:', error); // Debugging line
      }
    );
  }
  
}
