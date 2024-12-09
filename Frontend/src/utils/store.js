import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import themeReducer from '../features/themeSlice';

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: "root",
    storage,
}
const persistedThemeReducer = persistReducer(persistConfig, themeReducer)
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        theme: persistedThemeReducer
    },
    devTools: import.meta.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"]
            }
        })
            .concat([]),
});

export const persistor = persistStore(store);
