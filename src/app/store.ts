import { configureStore } from "@reduxjs/toolkit";
import { takeEvery } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

import dictionaryReducer, {
  ADD_DICTIONARY,
  DELETE_DICTIONARY,
  GET_DICTIONARIES,
  UPDATE_DICTIONARY,
  addDictionarySaga,
  deleteDictionarySaga,
  getDictionariesSaga,
  updateDictionarySaga,
} from "../features/dictionary/dictionarySlice";
import wordsReducer, {
  GET_ACTIVE_CARD,
  getActiveCardSaga,
} from "../features/word/wordsSlice";

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(GET_DICTIONARIES, getDictionariesSaga);
  yield takeEvery(ADD_DICTIONARY, addDictionarySaga);
  yield takeEvery(DELETE_DICTIONARY, deleteDictionarySaga);
  yield takeEvery(UPDATE_DICTIONARY, updateDictionarySaga);
  yield takeEvery(GET_ACTIVE_CARD, getActiveCardSaga);
}

export const store = configureStore({
  devTools: true,
  reducer: {
    dictionaries: dictionaryReducer,
    activeCard: wordsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
