import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'

// redux store to keep track of all the reducers (only 1 cart reducer for now)
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;