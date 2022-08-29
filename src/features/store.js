import { configureStore } from '@reduxjs/toolkit';

import sentenceReducer from '@/features/Sentences';

const reduxStore = configureStore({
  reducer: {
    sentence: sentenceReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default reduxStore;
