import {createSlice} from "@reduxjs/toolkit";

const lessonSlice = createSlice({
    name: 'lesson',
    initialState: {
        exerciseResults: new Array(8).fill(null),
    },
    reducers: {
        answer: (state, action) => {
            state.exerciseResults[state.exerciseResults.indexOf(null)] = action.payload;
        }
    }
});

export const { answer } = lessonSlice.actions
export default lessonSlice.reducer;
