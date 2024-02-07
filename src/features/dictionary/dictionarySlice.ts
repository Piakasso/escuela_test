import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, getDoc, updateDoc } from "firebase/firestore";
import { cardsRef } from "../../app/firebase";
import { put, select } from "redux-saga/effects";
import { RootState } from "../../app/store";

import { fetchTranslate, getRandomColor } from "../../utils";
import { ICard } from "../../types";

interface IDictionaryState {
  list: Array<ICard>;
}

const initialState: IDictionaryState = {
  list: [],
};

export function* getDictionariesSaga(): any {
  const docSnap = yield getDoc(cardsRef);
  const { cards } = docSnap.data();
  yield put(setAllDictionary(cards));
}

export function* addDictionarySaga({ payload }: PayloadAction<string>): any {
  const ruWord = yield fetchTranslate(payload, "en", "ru");
  const newDictionary: ICard = {
    coverImage: "",
    configs: {
      cardStyle: {
        color: getRandomColor(),
        type: "block",
      },
      titleStyle: {
        color: getRandomColor(),
      },
    },
    title: {
      en: payload,
      ru: ruWord,
    },
    words: [],
  };

  yield updateDoc(cardsRef, {
    cards: arrayUnion(newDictionary),
  });

  yield put(addOneDictionary(newDictionary));
}

export function* deleteDictionarySaga({ payload }: PayloadAction<string>): any {
  yield put(deleteOneDictionary(payload));
  const { list } = yield select(selectAllDictionaries);
  yield updateDoc(cardsRef, "cards", list);
}

export function* updateDictionarySaga({ payload }: PayloadAction<ICard>) {
  yield put(updateOneDictionary(payload));
  const { list } = yield select(selectAllDictionaries);
  yield updateDoc(cardsRef, "cards", list);
}

const dictionarySlice = createSlice({
  name: "dictionaries",
  initialState: initialState,
  reducers: {
    setAllDictionary: (state, action) => {
      state.list = action.payload;
    },
    addOneDictionary: (state, action) => {
      state.list.push(action.payload);
    },

    deleteOneDictionary: (state, action) => {
      state.list = state.list.filter(
        (item) => item.title.en !== action.payload
      );
    },
    updateOneDictionary: (state, action) => {
      state.list = state.list.map((item) => {
        if (item.title.en === action.payload.title.en) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
  },
});

export const {
  setAllDictionary,
  addOneDictionary,
  deleteOneDictionary,
  updateOneDictionary,
} = dictionarySlice.actions;

//SAGA ACTIONS
export const GET_DICTIONARIES = "dictionaries/getDictionaries";
export const ADD_DICTIONARY = "dictionaries/addDictionary";
export const DELETE_DICTIONARY = "dictionaries/deleteDictionary";
export const UPDATE_DICTIONARY = "dictionaries/updateDictionary";

export const getDictionaries = createAction(GET_DICTIONARIES);
export const addDictionary = createAction<string>(ADD_DICTIONARY);
export const deleteDictionary = createAction<string>(DELETE_DICTIONARY);
export const updateDictionary = createAction<ICard>(UPDATE_DICTIONARY);

//SELECTORS
export const selectAllDictionaries = (state: RootState) => state.dictionaries;

export default dictionarySlice.reducer;
