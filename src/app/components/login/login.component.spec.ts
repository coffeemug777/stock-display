import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: DummyComponent,
          },
          { path: 'dashboard', component: DummyComponent },
        ]),
      ],
      providers: [LoginService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    loginService = TestBed.inject(LoginService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle valid login properly ', fakeAsync(() => {
    component.username = 'test';
    component.password = 'test123';
    const loginBtn = fixture.debugElement.nativeElement.querySelector(
      'button.login-button'
    );
    const location = TestBed.inject(Location);

    loginBtn.click();
    fixture.detectChanges();
    tick();
    expect(component.error).toEqual('');
    expect(location.path()).toEqual('/dashboard');
  }));

  it('should handle invalid login ', fakeAsync(() => {
    component.username = 'test111';
    component.password = 'test123';
    const loginBtn = fixture.debugElement.nativeElement.querySelector(
      'button.login-button'
    );
    const location = TestBed.inject(Location);

    loginBtn.click();
    fixture.detectChanges();
    tick();
    expect(component.error).toEqual('username/password not valid');
    expect(location.path()).toEqual('');
  }));

  it('should handle already logged in user ', fakeAsync(() => {
    loginService.login('test', 'test123');
    const loggedUser = loginService.getCurrentUser();
    const location = TestBed.inject(Location);
    expect(loggedUser).not.toBeUndefined();
    component.ngOnInit();
    tick();
    expect(location.path()).toEqual('/dashboard');
  }));
});

@Component({ template: '' })
class DummyComponent {}
