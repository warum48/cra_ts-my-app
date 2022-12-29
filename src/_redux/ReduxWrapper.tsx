import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

//import rootReducer from './reducers';
//import counterReducer from "./counterSlice";
//import inputReducer from "./inputSlice";
//import locationReducer from "./locationSlice";
//
//import { postReducer } from "./asyncThunkTestSlice";
//import { externalFetchReducer } from "./externalFetchSlice";
//import { complexReducer } from "./complexSlice";
//import { dictonariesReducer } from "./dictonariesSlice";
//import store from './store';

import unpersistableReducer from "./debug/unpersistableSlice";
import themeReducer from "./visualThemeSlice";

//import App from './App';

//add persist https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist

const persistConfig = {
  key: "root",
  version: 1,
  blacklist: [
    //"posts",
    //"users",
    //"alldictonaries"
    //"colorTheme"
  ],
  storage
};

const reducers = combineReducers({
  //  counter: counterReducer,
  //  inptf: inputReducer,
  unpersistable: unpersistableReducer,
  colorTheme: themeReducer
  //
  //  posts: postReducer,
  //  users: externalFetchReducer,
  //  complex: complexReducer,
  //alldictonaries: dictonariesReducer
});

//export type RootState = ReturnType;
export type RootState = ReturnType<typeof reducers>;
//export type RootState = ReturnType<typeof rootReducer>

const persistedReducer = persistReducer(persistConfig, reducers);
//const persistedReducer = persistReducer(persistConfig, counterReducer); //this line throws error, use combineReducers to fix and mix more reducers if needed

export const store_conf = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

let persistor = persistStore(store_conf);

interface IReduxWrapperProps {
  children: React.ReactNode;
}

export const ReduxWrapper = ({ children }: IReduxWrapperProps) => {
  //props
  /*ReactDOM.render(
  <Provider store={store_conf}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);*/

  return (
    <Provider store={store_conf}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

//check what is createWrapper
//export const Reduxium = createWrapper(makeStore, { debug: true });
