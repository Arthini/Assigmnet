// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';

const Header = ({ onOpenCreateTable, onOpenTableList }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Logo
        </Typography>
        <Button color="inherit" onClick={onOpenCreateTable}>
         New<AddIcon /> 
        </Button>
        <Button color="inherit" onClick={onOpenTableList}>
          Table List
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
