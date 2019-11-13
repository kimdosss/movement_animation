import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { SdofService } from '../services/sdof.service';
import { D3ChartsService } from '../services/d3-charts.service';
import * as _ from 'lodash'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class D3Component implements OnInit {

  variableForm = new FormGroup({
    mass: new FormControl(1),
    damping: new FormControl(1),
    stiffness: new FormControl(1),    
    displacement: new FormControl(1),
    velocity: new FormControl(10),
    period: new FormControl(2),
    increment: new FormControl(100)
  });  

  @ViewChild('chart')

  private chartContainer: ElementRef;
  data1 = [
    {
      letter: 'test',
      frequency: 1
    },
    {
      letter: 'qwe',
      frequency: 2
    },
    {
      letter: 'tesasdt',
      frequency: 6
    },
    {
      letter: 'tesxvcbt',
      frequency: 2
    },
    {
      letter: 'r6gkjg',
      frequency: 8
    },
  ];
  updateChart: any;

  constructor(
    private sdofService: SdofService,
    private d3ChartsService: D3ChartsService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.updateChart = 
    this.d3ChartsService.dataStream2(this.chartContainer);
    // this.d3ChartsService.createExampleChart(this.chartContainer, this.data1);
    console.log(this.updateChart)
  }

  test() {
    this.updateChart(this.getMovement());
    

  }

  getMovement() {
    const now = Date.now();

    const variables = {
      m: this.mass.value,
      c: this.damping.value,
      k: this.stiffness.value,
      x: this.displacement.value,
      v: this.velocity.value
    };
    const {wn} = this.sdofService.variables(
      variables.m, 
      variables.c, 
      variables.k
    );
    const calFunc = this.sdofService.calculate(variables);
    const tn = this.period.value * 3.14 / wn;
    const inc = this.increment.value;
    const timeRange = _.range(0, tn, tn / inc);
    const data = [];
    const xAxisData = [];
    
    timeRange.map((time, i) => {      
      ((i) => {
        console.log(time)
        data.push({
          time: now + Math.floor(time * 10000),
          value: calFunc(time)
        })
      })(i);
    });

    return {
      data: data,
      gap: tn / inc
    };
    
  }


  onSubmit() {
    const variables = {
      m: this.mass.value,
      c: this.damping.value,
      k: this.stiffness.value,
      x: this.displacement.value,
      v: this.velocity.value
    };
    const {wn} = this.sdofService.variables(
      variables.m, 
      variables.c, 
      variables.k
    );
    const calFunc = this.sdofService.calculate(variables);
    const tn = this.period.value * 3.14 / wn;
    const inc = this.increment.value;
    const timeRange = _.range(0, tn, tn / inc);
    const data = [];
    const xAxisData = [];

    timeRange.map((time, i) => {
      xAxisData.push(i);
      ((i) => {
        data.push(calFunc(time));
      })(i);
    });
    this.d3ChartsService.lineChart(this.chartContainer, data);

  }

  get mass() { return this.variableForm.get('mass'); }
  get damping() { return this.variableForm.get('damping'); }
  get stiffness() { return this.variableForm.get('stiffness'); }
  get displacement() { return this.variableForm.get('displacement'); }
  get velocity() { return this.variableForm.get('velocity'); }
  get period() { return this.variableForm.get('period'); }
  get increment() { return this.variableForm.get('increment'); }
}
