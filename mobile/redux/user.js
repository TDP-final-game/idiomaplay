import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: "",
        logged: false
    },
    reducers: {
        logIn: (state, action) => {
            const accessToken = action.payload;
            state.accessToken = accessToken;
            state.logged = true;
        }
    }
});

export const { logIn } = userSlice.actions
export default userSlice.reducer;
