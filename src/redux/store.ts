import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slice';
import thunk from 'redux-thunk'
import { persistReducer, persistStore, } from 'redux-persist';



const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, appSlice)
const store = configureStore({
    reducer: {
        appSlice: persistedReducer,
    },
    middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)

export default store