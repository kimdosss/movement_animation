import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SdofService {

  constructor() { }

  calculate(args) {
    const {m, c, k, x, v} = args;
    console.log(m, c, k)
    if (this.characteristicEquation(m, c, k) < 0) {
      return this.underDamped(m, c, k, x, v);
    } else if (this.characteristicEquation(m, c, k)  === 0) {
      return this.criticallyDamped(m, c, k, x, v);
    } else if (this.characteristicEquation(m, c, k) > 0) {
      return this.overDamped(m, c, k, x, v);
    }
  }

  characteristicEquation(m, c, k) {
    return c *c - 4 * m * k;
  }

  variables(m, c, k) {
    const wn = Math.sqrt(k / m);
    const cc = 2 * m *  Math.sqrt(k / m);
    const s = c / cc;
    const wd = wn * Math.sqrt(1 - s * s);
    return {
      wn: wn,
      wd: wd,
      s: s,
      cc: cc
    };
  }

  underDamped(m, c, k, x, v) {
    console.log('underDamped');
    const {wn, wd, s, cc} = this.variables(m, c, k);
    const exDecay = (t) => {
      return Math.exp(-s * wn * t);
    }; 
    const periodic = (t) => {
      return x * Math.cos(wd * t) + ((v + s * wn * x) / wd) * Math.sin(wd * t);
    }
    return (t) => {
      return exDecay(t) * periodic(t);
    };
  }

  criticallyDamped(m, c, k, x, v) {
    console.log('criticallyDamped');
    const {wn, wd, s, cc} = this.variables(m, c, k);
    const exDecay = (t) => {
      return Math.exp(- wn * t);
    }; 
    const periodic = (t) => {
      return x + (v + wn * x) * t;
    }
    return (t) => {
      return exDecay(t) * periodic(t);
    };
  }

  overDamped(m, c, k, x, v) {
    console.log('overDamped');
    const {wn, wd, s, cc} = this.variables(m, c, k);
    const co1 = Math.sqrt(s * s - 1);
    const exDecay = function(t) {
      const part1 = (x * wn * (s + co1) + v) / (2 * wn * co1),
        part2 = (-x * wn * (s - co1) - v) / (2 * wn * co1);
      
      return part1 * Math.exp((-s + co1) * wn * t) + 
        part2 * Math.exp((-s - co1) * wn * t);
    }; 
    const periodic = function(t) {
      return 1;
    }
    return (t) => {
      return exDecay(t) * periodic(t);
    };

  }

}
