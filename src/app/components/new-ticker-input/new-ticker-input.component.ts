import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-ticker-input',
  templateUrl: './new-ticker-input.component.html',
  styleUrls: ['./new-ticker-input.component.scss'],
})
export class NewTickerInputComponent {
  constructor(private router: Router) {}

  newTicker = '';

  buttonClick() {
    if (this.newTicker !== '') {
      this.router.navigate(['new-ticker-display'], {
        state: { ticker: this.newTicker },
      });
    }
  }

  ngOnInit() {}
}
