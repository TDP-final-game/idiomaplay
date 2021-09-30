const initialState = { string: 'facu' };

const append = (state, action) => {
  const { letter } = action.payload;
  return { string: state.string + letter };
};

const remove = (state) => {
  return { string: state.string.slice(0, -1) };
};

const reducers = {
  APPEND: append,
  REMOVE: remove,
};

export const concatReducer = (state = initialState, action) => {
  const func = reducers[action.type];
  if (!func) return state;
  return func(state, action);
};
