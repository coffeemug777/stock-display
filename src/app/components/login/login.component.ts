import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  username = '';
  password = '';
  error = '';

  loginClick() {
    if (this.username !== '' && this.password !== '') {
      const userResult = this.loginService.login(this.username, this.password);
      if (userResult.error === '') {
        this.error = '';
        this.router.navigate(['/dashboard'], { state: userResult.user });
      } else {
        this.error = userResult.error;
      }
    }
  }

  ngOnInit() {
    const currentUser = this.loginService.getCurrentUser();
    if (!!currentUser) {
      this.router.navigate(['/dashboard'], { state: currentUser });
    }
  }
}
