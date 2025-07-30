import { createSlice } from '@reduxjs/toolkit';

// const initialCart = {
//     items: [],
// }

// Creating the cart slice with name, initial state and reducers
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;
            const existing = state.items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            // state.items.push(action.payload);
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const product = state.items.find(item => item.id === id);
            if (product) {
                product.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const product = state.items.find(item => item.id === id);
            if (product) {
                if (product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },
        clearCart: (state) => {
            state.items.length = 0;
        },
    },
});

// named export of reducer actions and default export of the cart reducer
export const { addItem, increaseQuantity, decreaseQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;