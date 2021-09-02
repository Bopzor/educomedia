type ValueOf<T> = T[keyof T];

export const Actions = {
  setInformation: 'setInformation',
};

export const createAction = <Payload>(type: ValueOf<typeof Actions>, payload: Payload) => ({
  type,
  payload,
});
