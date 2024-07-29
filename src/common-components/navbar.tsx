import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, Grid } from '@mui/material';
import { ReactComponent as Logo } from './stonebridgecarras_logo.svg';
import { getAllUsers } from '../admin-view/business-logic/manage-users';
import { SessionContextValue, SessionStateContext } from '../sessionContext';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { deleteSession } = useContext(SessionStateContext) as SessionContextValue;
  const handleLogout = () => {
    deleteSession();
  };

  const handleManageUsersClick = async () => {
    try {
      const users = await getAllUsers();
      navigate('/users-table', { state: { data: JSON.stringify(users) } });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFFFFF", boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo style={{ width: '220px', height: '90px', marginLeft: "24px" }} />
        </Box>
        <Grid gap={8}>
          <Button
            style={{ color: "#696969", marginRight: "32px", fontSize: "15px" }}
            onClick={handleManageUsersClick}
          >
            Manage Users
          </Button>
          <Button
            style={{ color: "#FFFFFF", backgroundColor: '#696969', fontSize: "15px", marginRight: "24px", padding: "6px 12px" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
