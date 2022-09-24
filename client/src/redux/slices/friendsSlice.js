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
      const friendState = state.data.friendMessenger;
      const index = friendState.findIndex(
        (obj) =>
          obj.friendInfo._id === action.payload.receiverId ||
          obj.friendInfo._id === action.payload.senderId
      );
      friendState[index].lastMessage = action.payload;
    },

    SEEN_MESSAGE: (state, action) => {
      const friendState = state.data.friendMessenger;
      const index = friendState.findIndex(
        (obj) =>
          obj.friendInfo._id === action.payload.receiverId ||
          obj.friendInfo._id === action.payload.senderId
      );
      friendState[index].lastMessage.status = 'seen';
    },

    SENT_MESSAGE: (state, action) => {
      const friendState = state.data.friendMessenger;
      const index = friendState.findIndex(
        (obj) =>
          obj.friendInfo._id === action.payload.receiverId ||
          obj.friendInfo._id === action.payload.senderId
      );
      friendState[index].lastMessage.status = 'sent';
    },

    UPDATE_SEEN_MESSAGE: (state, action) => {
      const friendState = state.data.friendMessenger;
      const index = friendState.findIndex(
        (obj) => obj.friendInfo._id === action.payload.id
      );
      if (friendState[index].lastMessage) {
        friendState[index].lastMessage.status = 'seen';
      }
    },
  },
});

export default friendSlice;
