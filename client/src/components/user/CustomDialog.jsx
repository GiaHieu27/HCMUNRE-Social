import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function CustomDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{ style: { padding: '15px' } }}
      maxWidth={props.maxWidth ? props.maxWidth : 'xs'}
      fullWidth={props.fullWidth ? props.fullWidth : true}
      sx={{
        '& .MuiDialogContent-root': {
          paddingBottom: '7px',
        },
      }}
    >
      <DialogTitle>
        {props.title}
        {props.showIcon && (
          <Box textAlign={'center'}>
            {props.type === 'success' && (
              <CheckCircleOutlinedIcon
                color="success"
                sx={{ fontSize: '3.5rem' }}
              />
            )}
            {props.type === 'error' && (
              <ErrorOutlineOutlinedIcon
                color="error"
                sx={{ fontSize: '3.5rem' }}
              />
            )}
          </Box>
        )}
      </DialogTitle>
      <DialogContent>{props.content}</DialogContent>
      <DialogActions>{props.actions}</DialogActions>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  maxWidth: PropTypes.string,

  content: PropTypes.node,
  actions: PropTypes.node,

  showIcon: PropTypes.bool,
  open: PropTypes.bool,
  fullWidth: PropTypes.bool,

  handleClose: PropTypes.func,
};

export default CustomDialog;
