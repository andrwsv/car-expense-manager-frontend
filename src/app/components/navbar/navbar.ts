import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  get currentUser(): User | null {
    return this.authService.getCurrentUser();
  }
}
