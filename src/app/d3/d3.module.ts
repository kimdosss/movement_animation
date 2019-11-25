import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';

import { D3RoutingModule } from './d3-routing.module';
import { D3Component } from './d3.component';

import { D3ChartsService } from '../services/d3-charts.service';
import { D3Test1Component } from './d3-test1/d3-test1.component';
import { D3Test2Component } from './d3-test2/d3-test2.component';

@NgModule({
  declarations: [D3Component, D3Test1Component, D3Test2Component],
  imports: [
    CommonModule,
    D3RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [D3ChartsService]
})
export class D3Module { }
