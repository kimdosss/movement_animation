import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlaygroundModule } from './playground/playground.module';
import { WebglModule } from './webgl/webgl.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PlaygroundModule,
    WebglModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
