import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ChallengeService from '../services/challenge';

export const getHealth = createAsyncThunk(
  'challenge/getHealth',
  () => ChallengeService.getHealth().then(({data}) => data)
);

export const answerExercise = createAsyncThunk(
  'challenge/answerExercise',
  ([answer, exerciseId]) =>
    ChallengeService
      .answerExercise(answer, exerciseId)
      .then(({data}) => data)
);

export const nextExercise = createAsyncThunk(
  'challenge/nextExercise',
  () =>
    ChallengeService
      .nextExercise()
      .then(({data}) => data)
);

const challengeSlice = createSlice({
  name: 'challenge',
  initialState: {
    healthy: false,
    exerciseResults: new Array(8).fill(null)
  },
  extraReducers: builder => {
    builder.addCase(getHealth.fulfilled, (state) => {
      state.healthy = true;
    });

    builder.addCase(answerExercise.fulfilled, (state, { payload }) => {
      const index = state.exerciseResults.indexOf(null)
      state.exerciseResults[index] = payload.result
    });
  }
});

export default challengeSlice.reducer;
