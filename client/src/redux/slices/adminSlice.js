import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const adminSlice = createSlice({
  name: "admin",
  initialState: Cookies.get("admin") ? JSON.parse(Cookies.get("admin")) : null,
  reducers: {
    LOGIN: (state, action) => {
      return action.payload;
    },
    LOGOUT: (state, action) => {
      return null;
    },
    // UPDATEPICTURE: (state, action) => {
    //   state.picture = action.payload;
    // },
    // VERIFY: (state, action) => {
    //   state.verified = action.payload;
    // },
  },
});

export default adminSlice;
