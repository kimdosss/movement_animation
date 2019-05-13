import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';

//This is my case 
const routes: Routes = [
    {
        path: '',
        component: PlaygroundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
