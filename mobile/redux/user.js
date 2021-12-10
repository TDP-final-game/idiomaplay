import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',

  initialState: {
    userId: '',
    email: '',
    imageUrl: '',
    name: '',
    coins: 80,
    lives: 5,
    trophies: 0,
    logged: false,
  },

  reducers: {
    logIn: (state, action) => {
      const { email, userId, imageUrl, name, stats, trophies } = action.payload;
      state.userId = userId;
      state.email = email;
      state.imageUrl = imageUrl;
      state.name = name;
      state.logged = true;
      state.coins = stats.coins;
      state.lives = stats.lives;
      state.trophies = trophies;
    },

    updateStats: (state, action) => {
      const { stats } = action.payload;
      state.coins = stats.coins;
      state.lives = stats.lives;
    },

    updateTrophies: (state) => {
      state.trophies += 1;
    },
  },
});

export const { logIn, updateStats, updateTrophies } = userSlice.actions;
export default userSlice.reducer;
