import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user!: User;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.user = this.router.getCurrentNavigation()?.extras.state as User;
  }

  ngOnInit() {
    console.log(this.router.getCurrentNavigation(), this.activatedRoute);
  }
}
