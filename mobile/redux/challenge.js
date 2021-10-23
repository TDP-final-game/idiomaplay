import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';
import ChallengeService from '../services/challenge';

const challengeSlice = createSlice({
  name: 'challenge',
  initialState: {},
});

export default challengeSlice.reducer;
