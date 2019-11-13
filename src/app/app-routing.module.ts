import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';
import { D3Module } from './d3/d3.module';

//This is my case 
const routes: Routes = [
    {
        path: '',
        component: PlaygroundComponent
    }
];

@NgModule({
  imports: [
    D3Module,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
