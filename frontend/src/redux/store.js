import { combineReducers, configureStore } from '@reduxjs/toolkit';
import  userSlice  from './slices/slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LinkSlice from './slices/LinkSlice';
import errSlice from './slices/errSlice';

const rootReducer = combineReducers({ user: userSlice ,links: LinkSlice,});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const  store = configureStore({
  reducer : {persistedReducer,err:errSlice },
})
export const persistor = persistStore(store);
export default store;
