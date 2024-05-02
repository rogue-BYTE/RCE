import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  docs: [],
  current_doc: {},
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setDocs(state, action) {
      state.docs = action.payload;
    },
    setCurrentDoc(state, action) {
      state.current_doc = action.payload;
    },
  },
});

export const { setDocs, setCurrentDoc } = docsSlice.actions;
export default docsSlice.reducer;
