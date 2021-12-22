import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  result: string[] = [];

  arrayLength =  30_000_000;

  constructor() {}

  workerCalculation() {
    const worker =  new Worker(new URL('./test.worker', import.meta.url), { type: 'module' });
    worker.onmessage = ({ data }) => {
      this.alertResult(this.arrayLength, data);
      worker.terminate();
    };
    worker.postMessage('calc');
  }

  noWorkerCalculation() {
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

  makeAnimation() {
    this.result.push('Another string');
  }
}
