import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
export type User = {
  id: number;
  username: string;
  password: string;
  name: string;
};

const usersHardcoded = [
  {
    id: 1,
    username: 'test',
    password: 'test123',
    name: 'Denny Wibowo',
  },
  {
    id: 2,
    username: 'test2',
    password: 'test123',
    name: 'Ranni Milena',
  },
];

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users = new Map<string, User>();
  loggedUsers = new Map<string, User>();
  constructor(private router: Router) {
    usersHardcoded.forEach((user) => {
      this.users.set(user.username, user);
    });
  }

  login(username: string, password: string) {
    const user = this.users.get(username);
    if (!!user && user.password === password) {
      this.loggedUsers.set(user.username, user);
      return { error: '', user };
    }
    return { error: 'username/password not valid' };
  }

  logout(username: string) {
    if (this.loggedUsers.get(username)) {
      this.loggedUsers.delete(username);
      this.router.navigate(['']);
    } else {
      console.log('damn username not found', username, this.loggedUsers);
    }
  }
}
