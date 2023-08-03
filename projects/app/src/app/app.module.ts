import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WorkerModule } from 'angular-web-worker/angular';
import { AppComponent } from './app.component';
import { MultiplierWorker } from './multiplier.worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // the path in the init function must given as a string (not a variable) and the type must be 'module'
    WorkerModule.forWorkers([
      {worker: MultiplierWorker, initFn: () => new Worker('./multiplier.worker.ts', {type: 'module'})},
   ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
