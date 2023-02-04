import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: DummyComponent,
          },
          {
            path: 'dashboard',
            component: DummyComponent,
          },
        ]),
      ],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login correctly ', () => {
    let result = service.login('test', 'test123');
    expect(result).toEqual({
      error: '',
      user: {
        id: 1,
        username: 'test',
        password: 'test123',
        name: 'Denny Wibowo',
      },
    });

    expect(service.getCurrentUser()).toEqual({
      id: 1,
      username: 'test',
      password: 'test123',
      name: 'Denny Wibowo',
    });

    result = service.login('test', 'test');
    expect(result).toEqual({
      error: 'username/password not valid',
    });
  });

  it('should logout correctly ', fakeAsync(() => {
    let location: Location = TestBed.inject(Location);
    service.login('test', 'test123');
    tick();
    expect(service.currentUser).toEqual({
      id: 1,
      username: 'test',
      password: 'test123',
      name: 'Denny Wibowo',
    });

    service.logout('test');
    tick();
    expect(service.currentUser).not.toBeDefined();
    expect(location.path()).toEqual('/');

    service.login('test3434', 'test123');
    tick();
    expect(service.currentUser).not.toBeDefined();

    service.logout('test1111');
    tick();
    expect(service.currentUser).not.toBeDefined();
    expect(location.path()).toEqual('/');
  }));
});

@Component({ template: '' })
class DummyComponent {}
