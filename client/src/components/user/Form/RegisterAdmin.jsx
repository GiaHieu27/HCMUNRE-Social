import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'green',
    },
    // '&:hover fieldset': {
    //   borderColor: 'blue',
    // },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

function RegisterInputAdmin({ name, ...otherProps }) {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    size: 'small',
  };

  if (meta && meta.error && meta.touched) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <CssTextField {...configTextfield} />;
}

export default RegisterInputAdmin;
