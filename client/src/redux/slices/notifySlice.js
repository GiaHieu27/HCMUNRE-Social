import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createNotify } from '../../apis/post';

const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    notify: [],
    loading: false,
  },
  reducers: {},
});

export const fetchNotify = createAsyncThunk(
  'notify/fetchNotify',
  async ({ postId, recieverId, notify, react, token }) => {
    const data = await createNotify(postId, recieverId, notify, react, token);
    console.log(data);
    return data;
  }
);

export default notifySlice;
