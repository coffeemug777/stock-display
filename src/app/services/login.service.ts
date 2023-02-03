import { Injectable } from '@angular/core';
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
  constructor() {
    usersHardcoded.forEach((user) => {
      this.users.set(user.username, user);
    });
  }

  login(username: string, password: string) {
    const user = this.users.get(username);
    if (!!user && user.password === password) {
      return { error: '', user };
    }
    return { error: 'username/password not valid' };
  }
}
