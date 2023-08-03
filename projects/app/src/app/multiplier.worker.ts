import { Accessable, AngularWebWorker, bootstrapWorker, Callable, OnWorkerInit, Subscribable } from 'angular-web-worker';
import { BehaviorSubject } from 'rxjs';
/// <reference lib="webworker" />

@AngularWebWorker()
export class MultiplierWorker implements OnWorkerInit {
    @Accessable() multipliers!: number[];
    @Subscribable() event!: BehaviorSubject<number>;

    constructor() {}

    onWorkerInit() {
      this.multipliers = [1, 2, 3, 4, 5];
      this.event = new BehaviorSubject(5);

      let counter = 4;
      let interval = setInterval(() => {
        if(counter == 0) {
          clearInterval(interval);
          return;
        }

        this.event.next(counter);

        counter--;
      }, 2000);
    }

    @Callable()
    async multiply(value1: number, value2: number): Promise<number> {
      return Promise.resolve(value1 * value2);
    }

    @Callable()
    async multiplyNumbers(): Promise<number> {
      return this.multipliers.reduce((acc, cur) => acc * cur, 1);
    }
}

bootstrapWorker(MultiplierWorker);
