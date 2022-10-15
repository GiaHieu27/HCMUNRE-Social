import { createSlice } from '@reduxjs/toolkit';

const messengerSlice = createSlice({
  name: 'messenger',
  initialState: {
    message: [],
    messageSendSuccess: false,
    messageGetSuccess: false,
    addNewUser: '',
    call: {
      receivingCall: false,
      // callAccepted: false,
      // callEnded: false,
      caller: '',
      callerSignal: '',
      stream: null,
      sender: {},
    },
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

    SET_STREAM: (state, action) => {
      state.call.stream = action.payload;
    },
    // SET_CALL_ACCEPTED: (state, action) => {
    //   state.call.callAccepted = action.payload;
    // },
    UPDATE_CALL_RECEVIER: (state, action) => {
      const { receivingCall, caller, callerSignal, sender } = action.payload;
      const stateCall = state.call;
      stateCall.receivingCall = receivingCall;
      stateCall.caller = caller;
      stateCall.callerSignal = callerSignal;
      stateCall.sender = sender;
    },
  },
});

export default messengerSlice;
