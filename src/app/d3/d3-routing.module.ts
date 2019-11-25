import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D3Component } from './d3.component';
import { D3Test1Component } from './d3-test1/d3-test1.component';
import { D3Test2Component } from './d3-test2/d3-test2.component';

const routes: Routes = [ {
  path: 'd3',
  component: D3Component
}, {
  path: 'd3test',
  component: D3Test1Component
}, {
  path: 'd3test2',
  component: D3Test2Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3RoutingModule { }
