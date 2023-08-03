import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() { }

  ngOnInit() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('../../multiplier.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
         console.log(`page got message: ${data}`);
      };
      worker.postMessage('hello');
    } else {

        // Web Workers are not supported in this environment.
        // You should add a fallback so that your program still executes correctly.
    }
  }

  async createWorker() {
    // can use the Promise.then().catch() syntax if preferred
    await this.client.connect();
  }
}
