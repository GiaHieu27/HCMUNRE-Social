import axios from 'axios';

export const createPost = async (
  type,
  background,
  text,
  images,
  videos,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      { type, background, text, images, videos, user },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return { status: 'ok', data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const reactPost = async (postId, react, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
      { postId, react },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  } catch (error) {
    return error.response.data.message;
  }
};

export const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getReacts/${postId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const comment = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/comment`,
      { postId, comment, image },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const savePost = async (postId, postUserId, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/savePost/${postId}`,
      { postUserId },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deletePost = async (postId, token) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/deletePost/${postId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const createNotify = async (
  postId,
  recieverId,
  notify,
  react,
  token
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createNotify`,
      { postId, recieverId, notify, react },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getAllNotify = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getAllNotify`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateStatusNotify = async (id, status, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateStatusNotify`,
      { status, id },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateStatusNotifySeen = async (id, status, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateStatusNotifySeen`,
      { status, id },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
