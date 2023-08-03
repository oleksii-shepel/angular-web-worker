import { MultiplierWorker } from './multiplier.worker';
import { Component } from '@angular/core';
import { WorkerClient, WorkerManager } from 'angular-web-worker/angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  private client!: WorkerClient<MultiplierWorker>;

  constructor(private workerManager: WorkerManager) { }

  async ngOnInit() {
    if (this.workerManager.isBrowserCompatible) {
      this.client = this.workerManager.createClient(MultiplierWorker);
    } else {
      // if code won't block UI else implement other fallback behaviour
      this.client = this.workerManager.createClient(MultiplierWorker, true);
    }

    await this.createWorker();
    let result = await this.client.call(m => m.multiply(10,10));
    console.log(result);
  }

  async createWorker() {
    // can use the Promise.then().catch() syntax if preferred
    await this.client.connect();
  }
}
