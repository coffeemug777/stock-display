import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  username = '';
  password = '';
  error = '';
  loginClick() {
    if (this.username !== '' && this.password !== '') {
      const userResult = this.loginService.login(this.username, this.password);
      if (userResult.error === '') {
        console.log('move to dashboard');
        this.error = '';
      } else {
        this.error = userResult.error;
      }
    }
  }
}
