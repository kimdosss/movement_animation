import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebglRoutingModule } from './webgl-routing.module';
import { WebglComponent } from './webgl.component';
import { WebglChartComponent } from './webgl-chart/webgl-chart.component';

@NgModule({
  declarations: [WebglComponent, WebglChartComponent],
  imports: [
    CommonModule,
    WebglRoutingModule
  ]
})
export class WebglModule { }
