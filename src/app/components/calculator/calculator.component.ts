import { Component } from '@angular/core';
import {CalculatorService} from "../../services/calculator.service";
import {Observable} from "rxjs";
import {Data} from "../../models/data";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  public readonly data$: Observable<Data>;

  constructor(private readonly calculatorService: CalculatorService) {
    this.data$ = this.calculatorService.data$;
    this.calculatorService.createWorker();
  }
  
  public action1() {
    this.calculatorService.action1();
  }

  public action2() {
    this.calculatorService.action2();
  }

  public action3() {
    this.calculatorService.action3();
  }
}
