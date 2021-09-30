const initialState = { value: 0 };

const increment = (state, action) => {
  return { value: state.value + 1 };
};

const decrement = (state, action) => {
  return { value: state.value - 1 };
};

const reducers = {
  INCREMENT: increment,
  DECREMENT: decrement,
};

export const counterReducer = (state = initialState, action) => {
  const func = reducers[action.type];
  if (!func) return state;
  return func(state, action);
};
