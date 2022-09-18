import { configureStore } from '@reduxjs/toolkit';
import adminSlice from '../slices/adminSlice';

import friendSlice from '../slices/friendsSlice';
import messengerSlice from '../slices/messengerSlice';
import profileSlice from '../slices/profileSlice';
import themeSlice from '../slices/themeSlice';
import userSlice from '../slices/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
    profile: profileSlice.reducer,
    friends: friendSlice.reducer,
    theme: themeSlice.reducer,
    messenger: messengerSlice.reducer,
  },
});

export default store;
