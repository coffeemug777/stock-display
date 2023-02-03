import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
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
