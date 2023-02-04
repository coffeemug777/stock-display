import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GraphComponent } from '../graph/graph.component';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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
      imports: [RouterTestingModule],
      declarations: [DashboardComponent, GraphComponent],
      providers: [{ provide: Router, useValue: routerStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
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
