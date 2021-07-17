import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  loading: false,
  error: false,
  items: [],
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setItems: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.items = payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const { setLoading, setItems, setError } = itemSlice.actions;

export const itemsSelector = (state) => state.items;

export default itemSlice.reducer;

const api = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  export function fetchItems(page, id) {
    return async (dispatch) => {
      api
        .get(`https://api.thecatapi.com/v1/images/search?limit=${page}&page=1&category_ids=${id}`)
        .then((response) => {
          dispatch(setItems(response.data));
        })
        .catch((er) => {
          dispatch(setError());
        });
    };
  }