import { configureStore } from '@reduxjs/toolkit';
import { concatReducer } from '../reducers/concatReducer';
import { counterReducer } from '../reducers/countReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    concat: concatReducer,
  },
});
