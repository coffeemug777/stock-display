import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/services/login.service';
import { GraphComponent } from '../graph/graph.component';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let loginService: LoginService;

  let routerStub = {
    getCurrentNavigation: () => ({
      extras: {
        state: {
          id: 0,
          name: 'Denny',
        },
      },
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [DashboardComponent, GraphComponent],
      providers: [{ provide: Router, useValue: routerStub }, LoginService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle dd changes ', () => {
    component.dd1Change('dd1test');
    component.dd3Change('dd3test');
    component.dd2Change('dd2test');

    expect(component.dd1).toEqual('dd1test');
    expect(component.dd2).toEqual('dd2test');
    expect(component.dd3).toEqual('dd3test');
  });

  it('should call logout when clicked ', fakeAsync(() => {
    loginService.login('test2', 'test123');
    component.user = {
      id: 0,
      username: 'test2',
      password: 'test123',
      name: 'Denny Wibowo',
    };
    const serviceSpy = spyOn(loginService, 'logout').and.returnValue();

    component.logout(new MouseEvent('test'));

    expect(serviceSpy).toHaveBeenCalledWith('test2');
  }));
});
/*
logged in, then move to dashboard
  stocks array consist of 3 elements, for load, just populate element 1 with random stock
    get stock random, assign to element 1

      create service to have stock arrays(hardcoded for now)
          service getRandomStock()
    
pass stock data to graph
graph display stock
*/
