import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult: any;
  dd1 = 'Select Ticker';
  dd2 = 'Select Ticker';
  dd3 = 'Select Ticker';
  tickers: string[] = [];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private stockService: StockService,
    private modalService: NgbModal
  ) {
    this.user = this.router.getCurrentNavigation()?.extras.state as User;
  }

  dd1Change(ticker: string) {
    this.dd1 = ticker;
  }

  dd2Change(ticker: string) {
    this.dd2 = ticker;
  }

  dd3Change(ticker: string) {
    this.dd3 = ticker;
  }

  logout($event: MouseEvent) {
    $event.preventDefault();
    this.loginService.logout(this.user.username);
  }

  open(content: string | TemplateRef<any>) {
    console.log('compare clicked');
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;

          const tickersApplied = [];
          if (this.dd1 !== 'Select Ticker') tickersApplied.push(this.dd1);
          if (this.dd2 !== 'Select Ticker') tickersApplied.push(this.dd2);
          if (this.dd3 !== 'Select Ticker') tickersApplied.push(this.dd3);

          if (tickersApplied.length) {
            console.log(tickersApplied);
          } else {
            console.log('nothing applied');
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.tickers = this.stockService.getAvailableTickers();
    this.stocks.push(this.stockService.getRandomStock());
  }
}
