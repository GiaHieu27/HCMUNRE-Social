import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Form, Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import CustomDialog from '../../../components/CustomDialog';
import RegisterInputAdmin from '../../../components/user/Form/RegisterAdmin';
import DateTimePicker from '../../../components/user/Form/DatetimePicker';

function CreateAdmin({ openCreate, setOpenCreate }) {
  const navigate = useNavigate();
  const css = {
    '&.MuiGrid-item': {
      paddingTop: '15px',
    },
  };
  const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    conf_password: '',
    gender: '',
    birthday: '',
  };

  const [user, setUser] = React.useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    conf_password,
    gender,
    birthday,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const RegisterValidation = yup.object({
    first_name: yup
      .string()
      .required('Vui lòng nhập Họ')
      .min(2, 'Tối thiểu 2 lý tự')
      .max(30, 'Tối đa 30 kí tự')
      .matches(/^[aA-zZ]+$/, 'Họ không được chứa số'),
    last_name: yup
      .string()
      .required('Vui lòng nhập Tên')
      .min(2, 'Tối thiểu 2 lý tự')
      .max(30, 'Tối đa 30 kí tự')
      .matches(/^[aA-zZ]+$/, 'Tên không được chứa số'),
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .email('Email không đúng định dạng')
      .max(100, 'Email tối đa 100 kí tự'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Mật khẩu tối thiểu 6 ký tự')
      .max(30, 'Mật khẩu tối đa 30 kí tự'),
    conf_password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
    gender: yup.string().required('Vui lòng chọn giới tính'),
    birthday: yup.string().required('Vui lòng chọn sinh nhật'),
  });

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/register`,
        {
          first_name,
          last_name,
          email,
          password,
          birthday,
          gender,
        }
      );

      if (data.message) {
        setOpenCreate(false);
        navigate(0);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <CustomDialog
      open={openCreate}
      handleClose={() => setOpenCreate(false)}
      maxWidth='500px'
      title='Tạo tài khoản quản trị viên'
      content={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: ' center',
            paddingTop: '10px',
          }}
        >
          <Formik
            enableReinitialize
            initialValues={{
              first_name,
              last_name,
              email,
              password,
              conf_password,
              gender,
              birthday,
            }}
            validationSchema={RegisterValidation}
            onSubmit={() => {
              registerSubmit();
            }}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <RegisterInputAdmin
                        name='first_name'
                        fullWidth
                        label='Nhâp Họ'
                        type='text'
                        onChange={handleRegisterChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RegisterInputAdmin
                        fullWidth
                        label='Nhập Tên'
                        name='last_name'
                        type='text'
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12} sx={css}>
                      <RegisterInputAdmin
                        fullWidth
                        label='Nhập Email'
                        name='email'
                        type='email'
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12} sx={css}>
                      <RegisterInputAdmin
                        fullWidth
                        name='password'
                        label='Nhập mật khẩu'
                        type='password'
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12} sx={css}>
                      <RegisterInputAdmin
                        fullWidth
                        name='conf_password'
                        label='Nhập lại mật khẩu'
                        type='password'
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12} sx={css}>
                      <FormControl>
                        <FormLabel>Giới tính</FormLabel>
                        <RadioGroup
                          aria-labelledby='demo-radio-buttons-group-label'
                          defaultValue='female'
                          name='gender'
                          row
                        >
                          <FormControlLabel
                            value='Nam'
                            control={<Radio />}
                            label='Nam'
                            onChange={handleRegisterChange}
                          />
                          <FormControlLabel
                            value='Nữ'
                            control={<Radio />}
                            label='Nữ'
                            onChange={handleRegisterChange}
                          />
                          <FormControlLabel
                            value='Khác'
                            control={<Radio />}
                            label='Khác'
                            onChange={handleRegisterChange}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={css}>
                      <DateTimePicker
                        name='birthday'
                        label='Sinh nhật'
                        onChange={handleRegisterChange}
                      />
                    </Grid>

                    <Grid item sx={css}>
                      <Button type='submit' variant='contained'>
                        Tạo
                      </Button>
                      <Button onClick={() => setOpenCreate(false)}>Hủy</Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Box>
      }
      // actions={

      // }
    />
  );
}

export default CreateAdmin;
