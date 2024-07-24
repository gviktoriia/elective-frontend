import { CurriculumService } from './../curriculum/curriculum.service';
import { ElectiveService } from './../electives/electives.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Elective } from '../../models/elective.model';
import { Curriculum } from '../../models/curriculum.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CurriculumFormComponent } from '../../shared/components/curriculum-form/curriculum-form.component';
import { EditCurriculumFormComponent } from '../../shared/components/edit-curriculum-form/edit-curriculum-form.component';
import { AuthService } from '../../core/login/auth.service';

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
  displayedColumns: string[] = ['name', 'email', 'scores', 'final_score', 'actions'];
  isAdmin: boolean = false;
  isStudent: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private electiveService: ElectiveService,
    private curriculumService: CurriculumService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isStudent = !this.isAdmin && this.authService.isLoggedIn();
    this.route.paramMap.subscribe(params => {
      this.electiveId = params.get('id')!;
      this.getElectiveDetails();
      this.fetchRegisteredStudents();
    });
    this.curriculumService.getCurriculums().subscribe(
      data => this.students = data,
      error => console.error('Error loading curriculums', error)
    );
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
          scoreString: (student.scores || []).map(score => score.score).join(', ')
        }));
      },
      (error) => {
        console.error('Error fetching students:', error); // Debugging line
      }
    );
  }

  registerStudent(): void {
    console.log("Opening dialog for adding curriculum"); // Debugging line
    const dialogRef = this.dialog.open(CurriculumFormComponent, {
      width: '400px',
      data: { electiveId: this.electiveId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchRegisteredStudents();
      }
    });
  }
  

  editStudent(student: Curriculum): void {
    const dialogRef = this.dialog.open(EditCurriculumFormComponent, {
      width: '400px',
      data: { curriculum: student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchRegisteredStudents();
      }
    });
  }

  deleteCurriculum(id: string): void {
    this.curriculumService.deleteCurriculum(id).subscribe(
      () => this.fetchRegisteredStudents(),
      error => console.error('Error deleting curriculum', error)
    );
  }
}
