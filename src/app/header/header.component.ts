import { Component, inject } from '@angular/core';
import { MaterialsModule } from '../material/material.module';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialsModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  router=inject(Router);
  logout(){
    localStorage.removeItem("access_token");
    this.authService.isLoggedIn.set(null);
    this.router.navigateByUrl('login');
  }
}
