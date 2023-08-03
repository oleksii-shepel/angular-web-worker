import { Subscription } from 'rxjs';
import { MultiplierWorker } from './multiplier.worker';
import { Component } from '@angular/core';
import { WorkerClient, WorkerManager } from 'angular-web-worker/angular';
import { DividerWorker } from './divider.worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private subscription!: Subscription;
  private client!: WorkerClient<MultiplierWorker>;
  private client2!: WorkerClient<DividerWorker>;

  constructor(private workerManager: WorkerManager) { }

  async ngOnInit() {
    if (this.workerManager.isBrowserCompatible) {
      this.client = this.workerManager.createClient(MultiplierWorker);
      this.client2 = this.workerManager.createClient(DividerWorker);
    } else {
      // if code won't block UI else implement other fallback behaviour
      this.client = this.workerManager.createClient(MultiplierWorker, true);
      this.client2 = this.workerManager.createClient(DividerWorker, true);
    }

    await this.createWorker();
    const multipliers = await this.client.get(w => w.multipliers);
    console.log(multipliers);

    let result = await this.client.call(m => m.multiplyNumbers());
    console.log(result);

    await this.client.set(w => w.multipliers, [1, 2, 3]);
    result = await this.client.call(m => m.multiplyNumbers());
    console.log(result);

    result = await this.client.call(m => m.multiply(10,10));
    console.log(result);

    this.subscription = await this.client.subscribe(w => w.event,
      (no) => { console.log(no); },
      // optional
      (err) => { console.log(err); },
      () => { console.log('Done'); }
    );

    result = await this.client2.call(d => d.divide(10,2));
    console.log(result);
  }

  async createWorker() {
    // can use the Promise.then().catch() syntax if preferred
    await this.client.connect();
    await this.client2.connect();
  }

  ngOnDestroy() {
    this.client.unsubscribe(this.subscription);
  }
}
