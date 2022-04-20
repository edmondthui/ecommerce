// import { configureStore } from "@reduxjs/toolkit";
import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger';
import { rootReudcer } from './root-reducer';

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReudcer, undefined, composedEnhancers);