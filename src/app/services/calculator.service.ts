import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { MessageIn } from "../models/message-in";
import { MessageOut } from "../models/message-out";
import { Data } from "../models/data";

interface TypedWorker<In, Out> extends Omit<Worker, 'postMessage'> {
  postMessage(command: In): void;
  onmessage: ((this: Worker, ev: MessageEvent<Out>) => void) | null;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService implements OnDestroy {
  private readonly data$$: BehaviorSubject<Data>;

  public readonly data$: Observable<Data>;

  private worker: TypedWorker<MessageIn, MessageOut> | undefined;

  constructor() {
    this.data$$ =  new BehaviorSubject<Data>(CalculatorService.createData());
    this.data$ = this.data$$.asObservable();
    this.worker = undefined;
  }

  ngOnDestroy() {
      this.worker?.terminate();
  }

  public action1(): void {
    this.worker?.postMessage({
      type: 'action1',
      data: this.data$$.value.action1
    });
  }

  public action2(): void {
    this.worker?.postMessage({
      type: 'action2',
      data: this.data$$.value.action2
    });
  }

  public action3(): void {
    this.worker?.postMessage({
      type: 'action3',
      data: this.data$$.value.action3
    });
  }

  private static createData(): Data {
    return {
      action1: 2,
      action2: '',
      action3: []
    };
  }

  public createWorker(): void {
    this.worker = new Worker(new URL('./calculator.worker', import.meta.url), { type: 'module' });
    // const workerPath = new URL('./calculator.worker', import.meta.url);
    // this.worker = new Worker(workerPath, { type: 'module' });

    this.worker.onmessage = ({ data }) => {
      const { response, type } = data;
      this.data$$.next({
        ...this.data$$.value,
        [type]: response
      });
    }
  }
}
