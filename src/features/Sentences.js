import { createSlice } from '@reduxjs/toolkit';

/**
 * @type {{currentSelected: SentenceData, currentSelectedIndex: number}}
 */
const initialState = {
  currentSelected: null,
  currentSelectedIndex: 0,
};

export const sentenceSlice = createSlice({
  name: 'sentence',
  initialState,
  reducers: {
    setCurrentSelectedSentence: (state, action) => {
      state.currentSelected = action.payload;
    },
    setCurrentSelectedIndex: (state, action) => {
      state.currentSelectedIndex = action.payload;
    },
    getCurrentSelected: (state) => {
      return state.currentSelected;
    },
  },
});

export const { setCurrentSelectedSentence, setCurrentSelectedIndex } =
  sentenceSlice.actions;
/**
 * @param  {ReturnType<SentenceData>} state
 * @returns {null|SentenceData}
 */
export const getCurrentSelectedSentence = (state) =>
  state.sentence.currentSelected;

/**
 * @param  {ReturnType<SentenceData>} state
 * @returns {null|number}
 */
export const getCurrentSelectedSentenceIndex = (state) =>
  state.sentence.currentSelectedIndex;

export default sentenceSlice.reducer;
