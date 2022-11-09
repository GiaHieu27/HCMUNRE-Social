import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';

const SummaryInfo = ({ title, number, icon }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="body2" fontWeight={'600'}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={'600'}>
          {number}
        </Typography>
      </Stack>
      <div>{icon}</div>
    </Box>
  );
};

SummaryInfo.propTypes = {
  title: PropTypes.string,
  number: PropTypes.string,
  icon: PropTypes.object,
};

export default SummaryInfo;
