import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import MenuItem from '@mui/material/MenuItem'; // Add this import

function AdminAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            variant="text"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(!open)}
            sx={{ minWidth: '30px', p: '4px' }}
          >
            <MenuIcon />
          </Button>
        </Box>
        <Box>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Box>
      </Box>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: '250px',
            backgroundColor: 'background.paper',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
              p: 2,
            }}
          >
            <MenuItem
              component={Link}
              to="/admin/dashboard"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Admin Dashboard
            </MenuItem>
            <MenuItem
              component={Link}
              to="/createuser"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Create User
            </MenuItem>
            <MenuItem
              component={Link}
              to="/createrole"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Create Role
            </MenuItem>
            <MenuItem
              component={Link}
              to="/admin/assign-user-role"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Assign Role
            </MenuItem>
            <MenuItem
              component={Link}
              to="/login"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Logout
            </MenuItem>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

AdminAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AdminAppBar;
