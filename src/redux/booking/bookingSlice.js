import { createSlice } from '@reduxjs/toolkit';
import { initialStateBooking } from '../favorite/constants';
import { postBooking } from './operation';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialStateBooking,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postBooking.pending, state => {
        state.isLoading = true;
      })
      .addCase(postBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.bookings.push(action.payload);
      })
      .addCase(postBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;
