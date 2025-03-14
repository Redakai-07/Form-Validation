import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Failed to load state:', err);
    return undefined;
  }
};

const initialState = loadState() || {
  formData: {},
  formValues: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      state.formData = action.payload;
    },
    saveFormValues: (state, action) => {
      state.formValues = action.payload;
    },
  },
});

export const { saveFormData, saveFormValues } = formSlice.actions;
export default formSlice.reducer;
