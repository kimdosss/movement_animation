import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';

import { PlaygroundComponent } from './playground.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxEchartsModule
  ]
})
export class PlaygroundModule { }
