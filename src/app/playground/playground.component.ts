import { Component, OnInit } from '@angular/core';
import { SdofService } from '../services/sdof.service';
import * as _ from 'lodash'
import { FormGroup, FormControl } from '@angular/forms';
import * as Bezier from 'bezier-js';
import * as THREE from 'three';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  options: any;
  variableForm = new FormGroup({
    mass: new FormControl(1),
    damping: new FormControl(1),
    stiffness: new FormControl(1),    
    displacement: new FormControl(1),
    velocity: new FormControl(0)
  });

  constructor(private sdofService: SdofService) { }

  ngOnInit() {
    console.log(THREE.CubicBezierCurve)
    var curve = new THREE.CubicBezierCurve(
      new THREE.Vector2( 0, 0 ),
      new THREE.Vector2( 0.25, 1 ),
      new THREE.Vector2( 0.25, 1 ),
      new THREE.Vector2( 1, 1 )
    );
    var points = curve.getPoints( 50 );
    const xAxis =[], yAxis = [];
    points.map(item => {
      xAxis.push(item.x);
      yAxis.push(item.y);
    });
    this.drawGraph(xAxis, yAxis);
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
    const tn = 2 * 3.14 / wn;
    const inc = 100;
    const timeRange = _.range(0, tn, tn / inc);
    const data = [];
    const xAxisData = [];

    timeRange.map((time, i) => {
      xAxisData.push(i);
      ((i) => {
        data.push(1 - calFunc(time));
      })(i);
    });

    
    this.drawGraph(xAxisData, data);

  }

  drawGraph(xAxis, yAxis) {
    this.options = {      
      xAxis: {
        data: xAxis,       
      },
      yAxis: {
      },
      series: [{
        name: 'line',
        type: 'line',
        data: yAxis
      }],
      tooltip: {},
    };
  }

  get mass() { return this.variableForm.get('mass'); }
  get damping() { return this.variableForm.get('damping'); }
  get stiffness() { return this.variableForm.get('stiffness'); }
  get displacement() { return this.variableForm.get('displacement'); }
  get velocity() { return this.variableForm.get('velocity'); }

}
