import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from '../../components/ToggleColorMode';
import MenuItem from '@mui/material/MenuItem';

function RespondAppBar({ mode, toggleColorMode }) {
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
              to="/respondentDash"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Home
            </MenuItem>
            <MenuItem
              component={Link}
              to="/settings"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Settings
            </MenuItem>
            <MenuItem
              component={Link}
              to="/Logout"
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

RespondAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default RespondAppBar;
