import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglChartComponent } from './webgl-chart.component';

describe('WebglChartComponent', () => {
  let component: WebglChartComponent;
  let fixture: ComponentFixture<WebglChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebglChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
