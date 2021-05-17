import Tooltip from '@material-ui/core/Tooltip';
import React from 'react'
import IconButton from '@material-ui/core/IconButton'

const CustomButton = ({ children, onClick, tip, btnClassName, tipClassName }) => (
    <Tooltip title={tip} className={tipClassName} placement="top">
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
);

export default CustomButton;
