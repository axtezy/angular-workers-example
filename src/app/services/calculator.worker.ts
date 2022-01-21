/// <reference lib='webworker' />
import { MessageOut } from "../models/message-out";
import { MessageIn } from "../models/message-in";

addEventListener('message', ({ data }) => {
  const result = Calculator.handleRequest(data);
  postMessage(result);
});

class Calculator {
  public static action1(data: number): MessageOut {
    return { type: 'action1', response: data * 2 };
  }

  private static action2(data: string): MessageOut {
    return { type: 'action2', response: data + '*' };
  }

  private static action3(data: number[]): MessageOut {
    return { type: 'action3', response: [...data, 0] };
  }

  public static handleRequest(message: MessageIn): MessageOut {
    switch (message.type) {
      case 'action1': {
        return Calculator.action1(message.data);
      }
      case 'action2': {
        return Calculator.action2(message.data);
      }
      case 'action3': {
        return Calculator.action3(message.data);
      }
    }
  }
}
