export type MessageTypeOut<M, R> = { type: M; response: R };

export type MessageOut =
    MessageTypeOut<'action1', number> |
    MessageTypeOut<'action2', string> |
    MessageTypeOut<'action3', number[]>;
