import axios from 'axios';
import messengerSlice from '../redux/slices/messengerSlice';

const messengerActions = messengerSlice.actions;

export const messageSend = async (dataMessage, token, dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/messageSend`,
      { dataMessage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(messengerActions.MESSAGE_SEND_SUCCESS(data));
  } catch (error) {
    return error.response.data.message;
  }
};

export const getAllMessage = async (id, token, dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getMessage/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(messengerActions.MESSAGE_GET_SUCCESS(data));
  } catch (error) {
    return error.response.data.message;
  }
};

export const imageMessageSend = async (
  sender,
  receiverId,
  img,
  token,
  dispatch
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/messageSendImage`,
      { sender, receiverId, img },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(messengerActions.MESSAGE_SEND_SUCCESS(data));
  } catch (error) {
    return error.response.data.message;
  }
};

export const seenMessage = async (msg, token) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/seen-message`,
      { msg },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error.response.data.message;
  }
};

export const sentMessage = async (msg, token) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/sent-message`,
      { msg },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error.response.data.message;
  }
};
