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
    MESSAGE_SEND_SUCCESS: (state, action) => {
      return {
        ...state,
        message: [...state.message, action.payload],
        messageSendSuccess: true,
      };
    },
    // LOGOUT: (state, action) => {
    //   return null;
    // },
    // UPDATEPICTURE: (state, action) => {
    //   state.picture = action.payload;
    // },
    // VERIFY: (state, action) => {
    //   state.verified = action.payload;
    // },
  },
});

export default messengerSlice;
