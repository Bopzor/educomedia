export type Action<T extends string> = {
  type: T;
};

export type ActionWithPayload<T extends string, P> = Action<T> & { payload: P };

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P): Action<T> | ActionWithPayload<T, P> {
  if (payload !== undefined) {
    return { type, payload };
  }

  return { type };
}
