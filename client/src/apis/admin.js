import axios from 'axios';

export const visitWebsite = async (token) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/admin/countAccess`,
      {},
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

export const getTotalAnalyze = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/getTotalAnalyze`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getOneUser = async (id, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/getOneUser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
