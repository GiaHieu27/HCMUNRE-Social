import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Box, Typography } from '@mui/material';

function PageHeader({ title, rightContent }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}
    >
      <Stack>
        <Typography variant="h6">{title}</Typography>
      </Stack>
      {rightContent}
    </Box>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  rightContent: PropTypes.node,
};

export default PageHeader;
