import { createSlice } from '@reduxjs/toolkit';

const lessonSlice = createSlice({
  name: 'lesson',
  initialState: {
    exerciseResults: new Array(8).fill(null),
  },
  reducers: {
    answer: (state, action) => {
      state.exerciseResults[state.exerciseResults.indexOf(null)] = action.payload;
    },
    resetResults: (state, action) => {
      const isExam = action.payload;
      state.exerciseResults = new Array(isExam ? 16 : 8).fill(null);
    },
    initResults: (state, action) => {
      const statusConverter = { PENDING: null, FAILED: false, PASSED: true };
      const results = action.payload.map((attempt) => attempt.status);
      state.exerciseResults = results.map((status) => statusConverter[status]);
    },
  },
});

export const { initResults, answer, resetResults } = lessonSlice.actions;
export default lessonSlice.reducer;
