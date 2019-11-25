import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3Test2Component } from './d3-test2.component';

describe('D3Test2Component', () => {
  let component: D3Test2Component;
  let fixture: ComponentFixture<D3Test2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3Test2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3Test2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
