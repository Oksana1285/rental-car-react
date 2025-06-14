import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCar = createAsyncThunk(
    "cars/getCar",
    async ({ page, limit, filters }, { rejectWithValue }) => {
        try {
            const response = await axios.get("rent", {
                params: { page, limit, ...filters },
            });
            return { data: response.data.data, totalPages: response.data.totalPages };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCarMore = createAsyncThunk(
    "cars/getCarMore",
    async ({ page, limit, filters }, { rejectWithValue }) => {
        try {
            const response = await axios.get("rent", {
                params: { page, limit, ...filters },
            });
            return { data: response.data.data, totalPages: response.data.totalPages };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
