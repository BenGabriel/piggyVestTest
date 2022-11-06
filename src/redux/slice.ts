import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../types/types';
import { fetchAllCategories, fetchCategoryItem } from './actions';

const initialState: AppState = {
    cart: [],
    category: [],
    item: [],
    loading: false,
    itemLoading: false
};


export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload];
        },
        removeFromCart: (state, action) => {
            const index = state.cart.findIndex(
                (item) => item.strMeal === action.payload
            );
            let newBasket = [...state.cart];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn("cant remove that");
            }

            state.cart = newBasket;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllCategories.pending, state => {
            state.loading = state.category.length > 0 ? false : true
        }).addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload;
        }).addCase(fetchCategoryItem.pending, state => {
            state.itemLoading = true
        }).addCase(fetchCategoryItem.fulfilled, (state, action) => {
            state.itemLoading = false;
            state.item = action.payload;
        })
    },
});

export const { addToCart, removeFromCart } = appSlice.actions
export default appSlice.reducer;