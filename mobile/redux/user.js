import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    email: '',
    logged: false,
  },
  reducers: {
    logIn: (state, action) => {
      const { email, userId } = action.payload;
      state.userId = userId;
      state.email = email;
      state.logged = true;
    },
  },
});

export const { logIn } = userSlice.actions;
export default userSlice.reducer;
