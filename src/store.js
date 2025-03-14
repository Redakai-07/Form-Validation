import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slice';




const saveState = (state) => {
  try {
    const { formData, formValues } = state.form;
    sessionStorage.setItem('reduxState', JSON.stringify({ formData }));
    localStorage.setItem('formValues', JSON.stringify(formValues));
  } catch (err) {
    console.error('Failed to save state:', err);
  }
};



const loadState = () => {
  try {
    const sessionData = sessionStorage.getItem('reduxState');
    const formValues = localStorage.getItem('formValues');
    const parsedSessionData = sessionData ? JSON.parse(sessionData) : {};
    const parsedFormValues = formValues ? JSON.parse(formValues) : {};

    return {
      form: {
        formData: parsedSessionData.formData || {},
        formValues: parsedFormValues || {},
      },
    };
  } catch (err) {
    console.error('Failed to load state:', err);
    return undefined;
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    form: formReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
