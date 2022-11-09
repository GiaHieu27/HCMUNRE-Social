import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, colors, Toolbar } from '@mui/material';

import TopNav from '../../../components/admin/Layout/TopNav';
import SideBar from '../../../components/admin/Layout/SideBar';

function AdminHome() {
  return (
    <Box>
      <TopNav />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: colors.grey['100'],
            width: 'max-content',
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminHome;
