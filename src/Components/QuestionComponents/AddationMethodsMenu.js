import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';

const AddationMethodsMenu = ({ methods = [], anchorEl, setAnchorEl }) => {
    const handleClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl);
    return <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
            },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
        {
            methods?.map((method, index) => <div key={index} >
                <MenuItem onClick={method.function}>
                    {method.displayName}
                </MenuItem>
                {(index !== methods.length - 1) && <Divider />}
            </div>
            )
        }
        
    </Menu>;
};

export default AddationMethodsMenu;
