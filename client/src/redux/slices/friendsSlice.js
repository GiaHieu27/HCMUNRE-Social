import { createSlice } from '@reduxjs/toolkit';

const friendSlice = createSlice({
  name: 'friends',
  initialState: { loading: false, data: {}, error: '' },
  reducers: {
    FRIEND_REQUEST: (state, action) => {
      state.loading = true;
    },
    FRIEND_SUCCESS: (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.data = action.payload;
      }
    },
    FRIEND_ERROR: (state, action) => {
      if (state.error) {
        state.loading = false;
        state.error = action.payload;
      }
    },
    UPDATE_FRIEND_MESSAGE: (state, action) => {
      const index = state.data.friendMessenger.findIndex(
        (obj) =>
          obj.friendInfo._id === action.payload.msgInfo.receiverId ||
          obj.friendInfo._id === action.payload.msgInfo.senderId
      );
      state.data.friendMessenger[index].msgInfo = action.payload.msgInfo;
      // state.data.friendMessenger[index].msgInfo.status = action.payload.status;
    },
  },
});

export default friendSlice;
