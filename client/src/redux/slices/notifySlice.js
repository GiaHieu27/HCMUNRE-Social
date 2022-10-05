import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllNotify } from '../../apis/post';

const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    notifies: [],
    loading: false,
  },
  reducers: {
    UPDATE_REACT: (state, action) => {
      const { payload } = action;
      const notifyState = state.notifies;

      const index = notifyState.findIndex(
        (notify) => notify.postRef === payload.postRef
      );
      if (index !== -1) {
        notifyState[index].react = payload.react;
      } else {
        notifyState.unshift(payload);
      }
    },
    UPDATE_STATUS: (state, action) => {
      state.notifies.map((item) => {
        if (item.status === 'sent') {
          return (item.status = action.payload);
        }
        return item;
      });
    },
    UPDATE_STATUS_SEEN: (state, action) => {
      const { payload } = action;
      const notifyState = state.notifies;

      const index = notifyState.findIndex(
        (notify) => notify.postRef === payload.postRef
      );
      if (index !== -1) {
        notifyState[index].react = 'seen';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotify.fulfilled, (state, action) => {
      state.notifies = action.payload;
    });
  },
});

export const fetchNotify = createAsyncThunk(
  'notify/fetchNotify',
  async (token) => {
    const data = await getAllNotify(token);
    return data;
  }
);

export default notifySlice;
