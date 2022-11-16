import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

function TooltipBs({ children, title, placement }) {
  return (
    <OverlayTrigger
      key={placement ? placement : 'top'}
      placement={placement ? placement : 'top'}
      overlay={<Tooltip id={`tooltip-${placement}`}>{title}</Tooltip>}
    >
      <Button variant="outline-light link" className="p-0 btn_icon">
        {children}
      </Button>
    </OverlayTrigger>
  );
}

TooltipBs.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  placement: PropTypes.string,
};

export default TooltipBs;
