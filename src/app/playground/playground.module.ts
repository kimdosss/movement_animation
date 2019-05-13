import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    NgxChartsModule
  ]
})
export class PlaygroundModule { }
