import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    email: '',
    imageUrl: '',
    name: '',
    logged: false,
  },
  reducers: {
    logIn: (state, action) => {
      const { email, userId, imageUrl, name } = action.payload;
      state.userId = userId;
      state.email = email;
      state.imageUrl = imageUrl;
      state.name = name;
      state.logged = true;
    },
  },
});

export const { logIn } = userSlice.actions;
export default userSlice.reducer;
