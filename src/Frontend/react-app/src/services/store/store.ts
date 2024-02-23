import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./reducers";
import { thunk } from 'redux-thunk';
import {legacy_createStore as create} from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// export const store = create(rootReducer, enhancer);