import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, User } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user!: User;
  constructor(private router: Router, private loginService: LoginService) {
    this.user = this.router.getCurrentNavigation()?.extras.state as User;
  }

  logout($event: MouseEvent) {
    $event.preventDefault();
    this.loginService.logout(this.user.username);
  }
}
