import { Component, OnInit } from '@angular/core';
import { Elective } from '../../models/elective.model';
import { ElectiveService } from './electives.service';
import { MatTableModule } from '@angular/material/table';
import { Curriculum } from '../../models/curriculum.model';

@Component({
  selector: 'app-electives',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './electives.component.html',
  styleUrl: './electives.component.css'
})
export class ElectivesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'duration', 'lecture', 'lab', 'tutorial'];
  electives: Elective[] = [];
  curriculums: Curriculum[] = [];

  constructor(private electiveService: ElectiveService) { }

  ngOnInit(): void {
    this.electiveService.getElectives().subscribe(data => {
      this.electives = data;
    });
  }
}
