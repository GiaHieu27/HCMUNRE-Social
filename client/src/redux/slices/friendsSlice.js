import { createSlice } from '@reduxjs/toolkit';

const friendSlice = createSlice({
  name: 'friends',
  initialState: { loading: false, data: {}, error: '' },
  reducers: {
    FRIEND_REQUEST: (state, action) => {
      state.loading = true;
    },

    FRIEND_SUCCESS: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    FRIEND_ERROR: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    UPDATE_LAST_MESSAGE: (state, action) => {
      const index = state.data.friendMessenger.findIndex(
        (obj) =>
          obj.friendInfo._id === action.payload.lastMessage.receiverId ||
          obj.friendInfo._id === action.payload.lastMessage.senderId
      );
      state.data.friendMessenger[index].lastMessage =
        action.payload.lastMessage;
      // state.data.friendMessenger[index].lastMessage.status = action.payload.status;
    },

    SEEN_MESSAGE: (state, action) => {
      const index1 = state.data.friendMessenger.findIndex(
        (obj) =>
          obj.friendInfo._id === action.payload.lastMessage.receiverId ||
          obj.friendInfo._id === action.payload.lastMessage.senderId
      );
      state.data.friendMessenger[index1].lastMessage.status = 'seen';
    },

    SENT_MESSAGE: (state, action) => {
      const index2 = state.data.friendMessenger.findIndex(
        (obj) =>
          obj.friendInfo._id === action.payload.lastMessage.receiverId ||
          obj.friendInfo._id === action.payload.lastMessage.senderId
      );
      state.data.friendMessenger[index2].lastMessage.status = 'sent';
    },
  },
});

export default friendSlice;
