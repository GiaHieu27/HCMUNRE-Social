import React from 'react';
import { Box, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import CustomDialog from '../../../components/CustomDialog';
import RegisterInputAdmin from '../../../components/user/Form/RegisterAdmin';

function CreateAdmin({ openCreate, setOpenCreate }) {
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
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDate: new Date().getDate(),
    gender: '',
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
  });

  return (
    <CustomDialog
      open={openCreate}
      handleClose={() => setOpenCreate(false)}
      maxWidth="500px"
      title="Tạo tài khoản quản trị viên"
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
            initialValues={
              {
                // first_name,
                // last_name,
                // email,
                // password,
                // conf_password,
                // bYear,
                // bMonth,
                // bDate,
                // gender,
              }
            }
            validationSchema={RegisterValidation}
            // onSubmit={() => {
            //   checkDateAndGender();
            //   registerSubmit();
            // }}
          >
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <RegisterInputAdmin
                    name="first_name"
                    required
                    fullWidth
                    id="firstName"
                    label="Nhâp Họ"
                    type="text"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RegisterInputAdmin
                    required
                    fullWidth
                    id="last_name"
                    label="Nhập Tên"
                    name="last_name"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sx={css}>
                  <RegisterInputAdmin
                    required
                    fullWidth
                    id="email"
                    label="Nhập Email"
                    name="email"
                    autoComplete="email"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} sx={css}>
                  <RegisterInputAdmin
                    required
                    fullWidth
                    name="password"
                    label="Nhập mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sx={css}>
                  <RegisterInputAdmin
                    required
                    fullWidth
                    name="conf_password"
                    label="Nhập lại mật khẩu"
                    type="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      }
      actions={
        // !openModalReject ? (
        //   <Box
        //     sx={{
        //       display: 'flex',
        //       justifyContent: 'center',
        //       alignItems: ' center',
        //       marginTop: '20px',
        //     }}
        //     width="100%"
        //   >
        //     <TooltipMUI title="Huỷ cuộc gọi" placement="top">
        //       <Button
        //         variant="contained"
        //         size="small"
        //         color="error"
        //         sx={{
        //           borderRadius: '50%',
        //           minWidth: '50px',
        //           height: '50px',
        //         }}
        //         onClick={() => handleCancelCall(props.currentFriend._id)}
        //       >
        //         <CallEndIcon sx={{ fontSize: '1.7rem' }} />
        //       </Button>
        //     </TooltipMUI>
        //   </Box>
        // ) : (
        //   ''
        // )

        <Box></Box>
      }
    />
  );
}

export default CreateAdmin;
