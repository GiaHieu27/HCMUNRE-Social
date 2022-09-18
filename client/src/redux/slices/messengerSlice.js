import { createSlice } from '@reduxjs/toolkit';

const messengerSlice = createSlice({
  name: 'messenger',
  initialState: {
    message: [],
    messageSendSuccess: false,
    message_get_success: false,
    new_user_add: '',
  },
  reducers: {
    LOGIN: (state, action) => {
      return action.payload;
    },
    LOGOUT: (state, action) => {
      return null;
    },
    UPDATEPICTURE: (state, action) => {
      state.picture = action.payload;
    },
    VERIFY: (state, action) => {
      state.verified = action.payload;
    },
  },
});

export default messengerSlice;
