import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import PropagateLoader from 'react-spinners/PropagateLoader';
import axios from 'axios';
import * as yup from 'yup';
import 'boxicons';

import LoginInput from '../Inputs/LoginInput/LoginInput';
import Cookies from 'js-cookie';
import userSlice from '../../../redux/slices/userSlice';
import CustomDialog from '../../CustomDialog';
import { Box, Typography } from '@mui/material';
import moment from 'moment';

const loginInfo = {
  email: '',
  password: '',
};

function LoginForm({ containerRef }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState(loginInfo);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dataBlock, setDataBlock] = useState('');

  const { email, password } = login;

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = yup.object({
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .email('Vui lòng nhập đúng định dạng email')
      .max(100, 'Tối đa 100 kí tự'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Mật khẩu tối thiểu 6 kí tự'),
  });

  const handleLoginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );

      if (data && !data.isLock) {
        setError('');
        setSuccess(data.message);

        setTimeout(() => {
          dispatch(userSlice.actions.LOGIN(data));
          Cookies.set('user', JSON.stringify(data));
          navigate('/');
        }, 1500);
      } else {
        setDataBlock(data.updatedAt);
        setDialog(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  const handleClick = () => {
    containerRef.current.classList.toggle('sign-in');
    containerRef.current.classList.toggle('sign-up');
  };

  return (
    <div className='login_col align-items-centers flex-col sign-in'>
      <div className='form_wrapper align-items-centers'>
        <Formik
          enableReinitialize
          initialValues={{
            email,
            password,
          }}
          validationSchema={loginValidation}
          onSubmit={() => handleLoginSubmit()}
        >
          {(formik) => {
            return (
              <Form className='form sign-in'>
                <LoginInput
                  type='text'
                  name='email'
                  placeholder='Nhập email của bạn'
                  iconName='envelope'
                  onChange={handleChangeLogin}
                  autoFocus
                />
                <LoginInput
                  type='password'
                  name='password'
                  placeholder='Nhập mật khẩu của bạn'
                  iconName='lock-alt'
                  onChange={handleChangeLogin}
                  bottom
                />
                <button
                  style={{ paddingBottom: `${loading ? '11px' : '0'}` }}
                  type='submit'
                >
                  {loading ? (
                    <PropagateLoader
                      color='white'
                      loading={loading}
                      size={12}
                    />
                  ) : (
                    'Đăng nhập'
                  )}
                </button>
                {error && <div className='error_text'>{error}</div>}
                {success && <div className='success_text'>{success}</div>}
                <p>
                  <b>
                    <Link to='/reset'>Quên mật khẩu</Link>
                  </b>
                </p>
                <p>
                  <span>Bạn chưa có tài khoản? </span>
                  <b className='pointer' onClick={() => handleClick()}>
                    Đăng ký ngay
                  </b>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>

      <CustomDialog
        open={dialog}
        title='Tài khoản của bạn đã bị khóa'
        handleClose={() => setDialog(false)}
        maxWidth='480px'
        content={
          <Box>
            <Typography sx={{ textAlign: 'center' }}>
              Chúng tôi phát hiện bạn đã vi phạm qui định sử dụng dịch vụ của
              chúng tôi. Liên hệ với người quản trị để biết thêm chi tiết
            </Typography>
            <Typography sx={{ textAlign: 'center', paddingTop: '10px' }}>
              {`Ngày khóa tài khoản: ${moment(dataBlock).format(
                'DD - MM - YYYY'
              )}`}
            </Typography>
          </Box>
        }
      />
    </div>
  );
}

LoginForm.propTypes = {
  containerRef: PropTypes.object,
};

export default LoginForm;
