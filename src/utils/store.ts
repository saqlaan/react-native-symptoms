import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import app from '@modules/symptoms.module';
import config from '@utils/config';

const store = configureStore({
  reducer: {
    app,
  },
  middleware: getDefaultMiddleware =>
    config.env === 'dev'
      ? getDefaultMiddleware({ serializableCheck: false }).concat(logger)
      : getDefaultMiddleware({ serializableCheck: false }),
  devTools: config.env === 'dev',
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
