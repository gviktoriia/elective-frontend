import { StudentsComponent } from './features/students/students.component';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { CurriculumComponent } from "./features/curriculum/curriculum.component";
import { filter } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, StudentsComponent, HttpClientModule, CurriculumComponent, NgIf, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
