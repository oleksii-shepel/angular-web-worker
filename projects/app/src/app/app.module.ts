import { WorkerModule } from 'angular-web-worker/angular';
import { MultiplierWorker } from './multiplier.worker';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DividerWorker } from './divider.worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // the path in the init function must given as a string (not a variable) and the type must be 'module'
    WorkerModule.forWorkers([
      {worker: MultiplierWorker, initFn: () => new Worker(new URL('./multiplier.worker', import.meta.url), {type: 'module'})},
      {worker: DividerWorker, initFn: () => new Worker(new URL('./divider.worker', import.meta.url), {type: 'module'})},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
