import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    NgxEchartsModule
  ]
})
export class PlaygroundModule { }
