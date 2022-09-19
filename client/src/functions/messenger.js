import axios from 'axios';

export const messageSend = async (dataMessage, token) => {
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
    // dispatchh({
    //   type: 'MESSAGE_SEND_SUCCESS',
    //   payload: data,
    // });
  } catch (error) {
    return error.response.data.message;
  }
};
