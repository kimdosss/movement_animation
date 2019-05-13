import { Component, OnInit } from '@angular/core';
import { SdofService } from '../services/sdof.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  view: any[] = [];

  constructor(private sdofService: SdofService) { }

  ngOnInit() {
    const var1 = {
      m: 1,
      c: 2,
      k: 1,
      x: 1,
      v: 0
    };
    const {wn} = this.sdofService.variables(var1.m, var1.c, var1.k);
    const calFunc = this.sdofService.calculate(var1);
    const tn = 2 * 3.14 / wn;
    const i = 10;
    const timeRange = _.range(0, tn, tn / i), displacement = [];
    console.log(timeRange);
    timeRange.map(time => {
      ((i) => {
        displacement.push(calFunc(time) * 100);
      })(i);
    });
    console.log(displacement)
  }

}
