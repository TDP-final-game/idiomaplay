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
    logged: false,
  },
  reducers: {
    logIn: (state, action) => {
      const { email, userId, imageUrl, name, stats } = action.payload;
      state.userId = userId;
      state.email = email;
      state.imageUrl = imageUrl;
      state.name = name;
      state.logged = true;
      state.coins = stats.coins;
      state.lives = stats.lives;
    },
  },
});

export const { logIn } = userSlice.actions;
export default userSlice.reducer;
