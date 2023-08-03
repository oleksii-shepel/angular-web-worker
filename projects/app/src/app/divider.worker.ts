import { Accessable, AngularWebWorker, bootstrapWorker, Callable, OnWorkerInit, Subscribable } from 'angular-web-worker';
import { BehaviorSubject } from 'rxjs';
/// <reference lib="webworker" />

@AngularWebWorker()
export class DividerWorker implements OnWorkerInit {
    constructor() {}

    onWorkerInit() {
    }

    @Callable()
    async divide(value1: number, value2: number): Promise<number> {
      return Promise.resolve(value1 / value2);
    }
}

bootstrapWorker(DividerWorker);
