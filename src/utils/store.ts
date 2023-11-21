import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import app from '@modules/symptoms.module';
import config from '@utils/config';

import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'app',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, app);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    config.env === 'dev'
      ? getDefaultMiddleware({ serializableCheck: false }).concat(logger)
      : getDefaultMiddleware({ serializableCheck: false }),
  devTools: config.env === 'dev',
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
