import { combineReducers, configureStore } from '@reduxjs/toolkit';
import  userSlice  from './slices/slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userSlice });

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const  store = configureStore({
  reducer : persistedReducer,
})
export const persistor = persistStore(store);
export default store;
