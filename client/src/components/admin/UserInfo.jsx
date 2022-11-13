import React from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  Box,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';

const initErr = {
  idCardErr: false,
  nameErr: false,
  phoneErr: false,
  addressErr: false,
};

function UserInfo({ user, onUpdateFalse, onUpdateSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [info, setInfo] = React.useState(user);
  const [infoErr, setInfoErr] = React.useState(initErr);

  // const { idNumber, fullName, phoneNumber, id } = info;
  // const { idNumberErr, fullNameErr, phoneNumberErr, addressErr } = infoErr;

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInfo({ ...info, [name]: value });
  // };

  // const handleUpdateUser = async () => {
  //   if (loading) return;
  //   const err = [!fullName, !phoneNumber, !idNumber, !address];

  //   setInfoErr((prev) => {
  //     let newInfoErr = {
  //       ...prev,
  //       idNumberErr: !idNumber,
  //       fullNameErr: !fullName,
  //       phoneNumberErr: !phoneNumber,
  //       addressErr: !address,
  //     };
  //     return newInfoErr;
  //   });

  //   if (!err.every((e) => !e)) return;
  //   setLoading(true);

  //   const body = {
  //     phoneNumber,
  //     idNumber,
  //     fullName,
  //     address: address.name,
  //   };

  //   try {
  //     const res = await userApi.updateUser(id, body);
  //     console.log(res);
  //     setLoading(false);
  //     onUpdateSuccess();
  //   } catch (error) {
  //     setLoading(false);
  //     onUpdateFalse(error.response.data.message);
  //   }
  // };

  // React.useEffect(() => {
  //   setInfo(user);
  // }, [user]);

  return (
    <Card elevation={2}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              {/* <TextField
                name="idNumber"
                label="Id card"
                value={idNumber}
                error={idNumberErr}
                onChange={(e) => handleChange(e)}
              /> */}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              {/* <TextField
                name="fullName"
                label="Full name"
                value={fullName}
                error={fullNameErr}
                onChange={(e) => handleChange(e)}
              /> */}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              {/* <TextField
                name="phoneNumber"
                label="Phone"
                type="number"
                value={phoneNumber}
                error={phoneNumberErr}
                onChange={(e) => handleChange(e)}
              /> */}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              {/* <Autocomplete
                options={dvhcvn.data}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Address"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                    // value={address}
                    // onChange={(event, newValue) => setAddress(newValue)}
                    error={addressErr}
                  />
                )}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box {...props}>{option.name}</Box>
                )}
                autoHighlight={true}
                blurOnSelect={true}
                value={address}
                onChange={(event, newValue) => setAddress(newValue)}
              /> */}
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        {/* <LoadingButton
          variant="contained"
          disableElevation
          onClick={handleUpdateUser}
          loading={loading}
          sx={{ margin: '0 auto' }}
        >
          Upadate
        </LoadingButton> */}
      </CardActions>
    </Card>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
  onUpdateFalse: PropTypes.func,
  onUpdateSuccess: PropTypes.func,
};

export default UserInfo;
