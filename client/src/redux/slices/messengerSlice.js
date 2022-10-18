import { createSlice } from '@reduxjs/toolkit';

const messengerSlice = createSlice({
  name: 'messenger',
  initialState: {
    message: [],
    messageSendSuccess: false,
    messageGetSuccess: false,
    addNewUser: '',
  },
  reducers: {
    MESSAGE_SEND_SUCCESS: (state, action) => {
      state.message.push(action.payload);
      state.messageSendSuccess = true;
    },
    messageGetSuccess: (state, action) => {
      state.message = action.payload;
      state.messageGetSuccess = true;
    },
    DISPLAY_MESSAGE_TO_FRIEND: (state, action) => {
      state.message.push(action.payload);
    },
    MESSAGE_SEND_SUCCESS_CLEAR: (state, action) => {
      state.messageSendSuccess = false;
    },
    messageGetSuccess_CLEAR: (state, action) => {
      state.messageGetSuccess = false;
    },
    UPDAT_STATUS_MESSAGE: (state, action) => {
      const messState = state.message;
      const index = messState.length - 1;
      messState[index].status = action.payload;
    },
    ADD_NEW_USER: (state, action) => {
      state.addNewUser = action.payload;
    },
    CLEAR_NEW_USER: (state, action) => {
      state.addNewUser = '';
    },
  },
});

export default messengerSlice;
