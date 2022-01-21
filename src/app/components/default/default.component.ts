import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  public result: string[] = [];

  private readonly arrayLength =  30_000_000;

  constructor() {}

  public workerCalculation() {
    const worker =  new Worker(new URL('./default.worker', import.meta.url), { type: 'module' });

    worker.onmessage = ({ data }) => {

      this.alertResult(this.arrayLength, data);
      worker.terminate();
    };

    const length = 30_000_000;
    const array = JSON.stringify(new Array(length).fill(0));
    console.log(Date.now())

    worker.postMessage(
        {
          type: 'calc',
          data: array
        })
  }

  public noWorkerCalculation() {
    const avg = this.calcAvg(this.arrayLength);
    this.alertResult(this.arrayLength, avg);
  }

  private calcAvg(length: number): string {
    const array = new Array(length).fill(0);
    const sum = array.reduce(prev => {
      return prev+(Math.random()**Math.random()**Math.random());
    })
    return String(sum/length);
  }

  private alertResult(length: number, avg: string): void {
    alert(`Calculation ends. Average value for ${length} length array is ${avg}`);
  }

  public printString() {
    this.result.push('Another string');
  }
}
