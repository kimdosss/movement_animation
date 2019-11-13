import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';

import { D3RoutingModule } from './d3-routing.module';
import { D3Component } from './d3.component';

import { D3ChartsService } from '../services/d3-charts.service';

@NgModule({
  declarations: [D3Component],
  imports: [
    CommonModule,
    D3RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [D3ChartsService]
})
export class D3Module { }
