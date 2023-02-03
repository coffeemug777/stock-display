import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, User } from 'src/app/services/login.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user!: User;
  stocks: any[] = [];
  constructor(
    private router: Router,
    private loginService: LoginService,
    private stockService: StockService
  ) {
    this.user = this.router.getCurrentNavigation()?.extras.state as User;
  }

  logout($event: MouseEvent) {
    $event.preventDefault();
    this.loginService.logout(this.user.username);
  }

  ngOnInit() {
    this.stocks.push(this.stockService.getRandomStock());
  }
}
