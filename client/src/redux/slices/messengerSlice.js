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
      state.message.push(action.payload);
      state.messageSendSuccess = true;
    },
    MESSAGE_GET_SUCCESS: (state, action) => {
      state.message = action.payload;
      state.message_get_success = true;
    },
    DISPLAY_MESSAGE_TO_FRIEND: (state, action) => {
      state.message.push(action.payload);
    },
    MESSAGE_SEND_SUCCESS_CLEAR: (state, action) => {
      state.messageSendSuccess = false;
    },
    MESSAGE_GET_SUCCESS_CLEAR: (state, action) => {
      state.message_get_success = false;
    },
  },
});

export default messengerSlice;
