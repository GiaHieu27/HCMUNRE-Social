import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumbs, Link as LinkMui, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function CustomBreadcrumds({ pathnames, name }) {
  return (
    <Breadcrumbs aria-label="bread-crumbs" separator={<NavigateNextIcon />}>
      {pathnames.map((pathName, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const lastItem = index === pathnames.length - 1;

        return lastItem ? (
          <Typography color="text.primary" key={index}>
            {/\d/.test(pathName) ? name : pathName}
          </Typography>
        ) : (
          <LinkMui
            component={Link}
            to={routeTo}
            underline="hover"
            color="inherit"
            key={index}
          >
            {/\d/.test(pathName) ? name : pathName}
          </LinkMui>
        );
      })}
    </Breadcrumbs>
  );
}

CustomBreadcrumds.propTypes = {
  pathnames: PropTypes.array,
  name: PropTypes.string,
};

export default CustomBreadcrumds;
