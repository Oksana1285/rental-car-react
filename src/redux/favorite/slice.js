import { createSlice } from "@reduxjs/toolkit";
import { initialStateCar } from "./constants";
import { getCarMore, getCar } from "./operation";

const carSlice = createSlice({
    name: 'car',
    initialState: initialStateCar,
    reducers: {
        addFavorite: {
            reducer(state, action) {
                state.favoriteCar.push(action.payload);
            },
            prepare(values) {
                return {
                    payload: {
                        ...values,
                    }
                }
            }
        },
        deleteFavorite: (state, action) => {
            state.favoriteCar = state.favoriteCar.filter(car =>
                car._id !== action.payload
            );
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        resetFilters: (state) => {
            state.filters = initialStateCar.filters;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCar.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cars = action.payload.data;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getCar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getCarMore.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCarMore.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cars = [...state.cars, ...action.payload.data];
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getCarMore.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const carReducer = carSlice.reducer;
export const { addFavorite, deleteFavorite, setFilters, resetFilters } = carSlice.actions;