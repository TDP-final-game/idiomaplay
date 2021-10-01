import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ChallengeService from '../services/challenge';

export const getHealth = createAsyncThunk(
  'challenge/getHealth',
  () => ChallengeService.getHealth().then(({ data }) => data)
);

const challengeSlice = createSlice({
  name: 'challenge',
  initialState: {
    healthy: false
  },
  extraReducers: builder => {
    builder.addCase(getHealth.fulfilled, (state, action) => {
      state.healthy = true;
    });
  }
});

export default challengeSlice.reducer;
