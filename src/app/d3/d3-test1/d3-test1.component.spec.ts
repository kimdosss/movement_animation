import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3Test1Component } from './d3-test1.component';

describe('D3Test1Component', () => {
  let component: D3Test1Component;
  let fixture: ComponentFixture<D3Test1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3Test1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3Test1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
