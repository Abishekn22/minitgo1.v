// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './Slices/CartSlice';

// export default configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/CartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck:false
  }),
});

export const persistor = persistStore(store);

export default store;
