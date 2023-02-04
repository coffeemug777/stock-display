import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from './graph.component';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle changes ', () => {
    component.stocks = [{ symbol: 'test1', data: [] }];
    component.chart.destroy();
    component.ngOnInit();
    const updateSpy = spyOn(component.chart, 'update').and.stub();

    expect(component.chart.data.datasets.length).toBeGreaterThan(0);

    component.stocks.push({ symbol: 'test2', data: [] });
    component.ngOnChanges();

    expect(component.chart.data.datasets.length).toEqual(2);
    expect(updateSpy).toHaveBeenCalled();
  });
});
