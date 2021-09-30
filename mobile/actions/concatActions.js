export const append = (letter) => ({
  type: 'APPEND',
  payload: { letter },
});

export const remove = () => ({
  type: 'REMOVE',
});
