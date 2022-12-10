import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import HomeIcon from '@mui/icons-material/Home';
import {
  AppBar,
  Avatar,
  Button,
  colors,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Cookies from 'js-cookie';
import adminSlice from '../../../redux/slices/adminSlice';

function TopNav() {
  const admin = useSelector((state) => state.admin);
  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logOut = () => {
    Cookies.set('user', '');
    dispatch(adminSlice.actions.LOGOUT());
    navigate('/admin/login');
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: colors.common.white,
        color: colors.common.black,
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '0px 1px 4px 1px rgb(0 0 0 / 12%)',
      }}
      elevation={0}
    >
      <Toolbar>
        <img src='/icons/LogoTNMT.png' alt='logo' width={37} height={37} />
        <Typography
          variant='h6'
          component='div'
          sx={{
            flexGrow: 1,
            marginLeft: '10px',
          }}
        >
          HCMUNRE SOCIAL
        </Typography>

        <Stack direction={'row'} spacing={3} alignItems='center'>
          <Button component={Link} to='/' startIcon={<HomeIcon />}>
            Website
          </Button>
          <Avatar
            alt='User image'
            src={admin.picture}
            sx={{ height: '30px', width: '30px' }}
          />
          <IconButton
            aria-label='logout'
            sx={{ color: colors.blue[800] }}
            onClick={logOut}
          >
            <ExitToAppOutlinedIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;
