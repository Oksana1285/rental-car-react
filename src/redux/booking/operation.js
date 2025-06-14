import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'helpers/axiosConfig';
import toast from "react-hot-toast";

export const postBooking = createAsyncThunk(
    "booking/addBooking",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('/books', data);
            toast.success('Thank you for choosing us! Our managers will contact you soon ❤️');
            return response.data;
        } catch (error) {
            toast.error("Oops... something went wrong 😯");
            return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
