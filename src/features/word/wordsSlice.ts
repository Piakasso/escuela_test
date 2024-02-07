import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { cardsRef } from "../../app/firebase";
import { getDoc } from "firebase/firestore";

import { RootState } from "../../app/store";
import { ICard } from "../../types";
import { setAllDictionary } from "../dictionary/dictionarySlice";

type WordsState = ICard;

const initialState: WordsState = {
  coverImage: "",
  configs: {
    cardStyle: {
      color: "",
      type: "block",
    },
    titleStyle: {
      color: "",
    },
  },
  title: {
    en: "",
    ru: "",
  },
  words: [],
};

export function* getActiveCardSaga({ payload }: PayloadAction<string>): any {
  const docSnap = yield getDoc(cardsRef);
  const cards: Array<ICard> = docSnap.data().cards;
  const choosenCard = cards.find((item) => item.title.en === payload);
  yield put(setAllDictionary(cards));
  yield put(setAсtiveCard(choosenCard));
}

const wordsSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    setAсtiveCard: (state, action) => {
      return (state = action.payload);
    },
    addWord: (state, action) => {
      state.words.push(action.payload);
    },
    deleteWord: (state, action) => {
      state.words = state.words.filter(
        (word) => action.payload !== word.learnWord
      );
    },
    updateWord: (state, { payload }) => {
      state.words = state.words.map((word, index) => {
        if (index === payload.number - 1) {
          return payload.updatedWord;
        } else {
          return word;
        }
      });
    },
    addCoverImage: (state, action) => {
      state.coverImage = action.payload;
    },
  },
});

export const { setAсtiveCard, addWord, deleteWord, updateWord, addCoverImage } =
  wordsSlice.actions;

//SAGA ACTIONS
export const GET_ACTIVE_CARD = "activeCard/getActiveCard";
export const getActiveCard = createAction<string>(GET_ACTIVE_CARD);

//SELECTORS
export const selectCard = (state: RootState) => state.activeCard;
export const selectCardTitle = (state: RootState) => state.activeCard.title;
export const selectWordsList = (state: RootState) => state.activeCard.words;
export const selectImage = (state: RootState) => state.activeCard.coverImage;
export const selectCardConfig = (state: RootState) => state.activeCard.configs;

export default wordsSlice.reducer;
