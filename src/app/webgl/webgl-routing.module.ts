import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebglComponent } from './webgl.component';
import { WebglChartComponent } from './webgl-chart/webgl-chart.component';

const routes: Routes = [{
  path: 'webgl',
  component: WebglComponent
}, {
  path: 'webgl-chart',
  component: WebglChartComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebglRoutingModule { }
