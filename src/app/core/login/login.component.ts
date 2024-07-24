import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;
  email!: string;
  card!: string;
  isAdmin: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.isAdmin) {
      this.authService.adminLogin(this.username, this.password).subscribe(
        () => this.router.navigate(['/']),
        err => console.error(err)
      );
    } else {
      this.authService.studentLogin(this.email, this.card).subscribe(
        () => this.router.navigate(['/']),
        err => console.error(err)
      );
    }
  }
}
