export type MessageTypeIn<M, D> = { type: M; data: D };

export type MessageIn =
    MessageTypeIn<'action1', number> |
    MessageTypeIn<'action2', string> |
    MessageTypeIn<'action3', number[]>;
