import { AngularWebWorker, bootstrapWorker, Callable, OnWorkerInit } from 'angular-web-worker';
/// <reference lib="webworker" />

@AngularWebWorker()
export class MultiplierWorker implements OnWorkerInit {

    constructor() {}

    onWorkerInit() {
      console.log('Worker initialized');
    }

    @Callable()
    async multiply(value1: number, value2: number): Promise<number> {
      return Promise.resolve(value1 * value2);
    }
}
bootstrapWorker(MultiplierWorker);
