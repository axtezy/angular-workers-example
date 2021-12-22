import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private readonly worker: Worker;

  private messages = ''

  constructor() {
    const workerPath = new URL('./test.worker', import.meta.url);
    this.worker =  new Worker(workerPath, { type: 'module' });
  }


}
