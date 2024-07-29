import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ReactComponent as DeleteIcon } from './delete-outline.svg';
import NavBar from '../../common-components/navbar';
import HeaderImage from '../../common-components/header-image';
import Footer from '../../common-components/footer';
import { user } from '../business-logic/admin-interfaces';
import { deleteUser, registerUser } from '../business-logic/manage-users';
import ReusableModal from '../../common-components/modal-edit-value';
import { ActionType } from './lease-details-table';

export interface EditPageProps {
  title: string;
  tableData: user[];
}

const ManageUsersPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUsers: EditPageProps = location.state?.data ? JSON.parse(location.state.data) : { title: '', tableData: [] };  const [tableEntry, setTableEntry] = useState<user[]>(initialUsers.tableData);
  const [users, setUsers] = useState<{ title: string; tableData: user[] }>(initialUsers);
  const [visiblePasswordEmail, setVisiblePasswordEmail] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ [key: string]: string } | undefined>();

  useEffect(() => {
    setUsers(prev => ({ ...prev, tableData: tableEntry }));
  }, [tableEntry]);

  const handleBack = () => navigate('/admin');

  const handleDelete = async (email: string) => {
    try {
      const response = await deleteUser(email);
      if (response?.message === "User deleted successfully") {
        setTableEntry(prev => prev.filter(user => user.email !== email));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = () => {
    setModalData({ fullName: '', email: '', password: '' });
    setModalOpen(true);
  };

  const getReqData = (textfieldsVal: { [id: string]: string }) => {
    const [firstName, lastName] = (textfieldsVal['FULL NAME'] || '').split(' ');
    return {
      email: textfieldsVal['EMAIL'],
      password: textfieldsVal['PASSWORD'],
      first_name: firstName || '',
      last_name: lastName || ''
    };
  };

  const handleOnConfirm = useCallback(async (action: ActionType = ActionType.Add, fields: { [key: string]: string }) => {
    if (!fields['FULL NAME'] || !fields['EMAIL'] || !fields['PASSWORD']) return;

    const userData = getReqData(fields);

    try {
      const response = await registerUser(userData);
      if (response === "User registered successfully") {
        setTableEntry(prev => [
          ...prev,
          {
            email: userData.email,
            password: userData.password,
            first_name: userData.first_name,
            last_name: userData.last_name
          }
        ]);
        setModalData(undefined);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }, []);

  const handleShowPassword = (email: string) => {
    setVisiblePasswordEmail(prevEmail => (prevEmail === email ? null : email));
  };

  const resetState = () => {
    setModalData(undefined);
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalData) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
      resetState();
    }
  }, [modalData]);

  return (
    <Box sx={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <NavBar />
      <Grid container spacing={0} sx={{ mt: 0 }}>
        <HeaderImage />
        <Box sx={{ mt: "28px", width: "100%" }}>
          <Grid container justifyContent="center">
            <Grid item xs={10} sx={{ borderRadius: "6px", border: "1px solid #0000001A", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <Grid container justifyContent="center" alignItems="center" sx={{ borderRadius: "6px 6px 0 0", backgroundColor: "#4CAF50", p: 2 }}>
                <Grid item xs={5} sx={{ textAlign: 'justify' }}>
                  <IconButton aria-label="back" onClick={handleBack}>
                    <ArrowBackIcon sx={{ color: '#FFFFFF', height: "20px", width: "20px" }} />
                  </IconButton>
                </Grid>
                <Grid item xs={7} sx={{ textAlign: 'justify' }}>
                  <Typography variant="h6" fontSize="18px" align="left" color="white" fontWeight="bold">{users.title}</Typography>
                </Grid>
              </Grid>

              {tableEntry.map(user => (
                <Grid
                  container
                  key={user.email}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    backgroundColor: "#FCFCFC",
                    p: 1,
                    borderTop: 0,
                    border: "0.6px solid #0000000D"
                  }}
                >
                  <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'left', pl: "36px" }}>
                      {user.email}
                      {visiblePasswordEmail === user.email && (
                        <Typography variant="subtitle2" sx={{ textAlign: 'left', pl: "16px", color: 'gray', display: 'inline' }}>
                          Password: {user.password}
                        </Typography>
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', pr: "36px", gap: "8px" }}>
                    <IconButton aria-label="showPassword" onClick={() => handleShowPassword(user.email)}>
                      <VisibilityIcon style={{ color: visiblePasswordEmail === user.email ? '#D60E0E' : '#45A0C8', height: "20px", width: "20px" }} />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(user.email)}>
                      <DeleteIcon style={{ color: '#D60E0E', height: "20px", width: "20px" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Grid
                item
                xs={12}
                sx={{
                  borderRadius: "0 0 6px 6px",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#FCFCFC",
                  p: 3,
                  borderTop: 0,
                  border: "1px solid #0000000D"
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    mr: "22px",
                    p: "6px 30px",
                    fontWeight: "600",
                    fontSize: "14.4px",
                    border: "2px solid #3F639B0",
                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)"
                  }}
                  onClick={handleAddUser}
                >
                  ADD
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    p: "7px 31px",
                    fontWeight: "600",
                    fontSize: "14px",
                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)"
                  }}
                  onClick={handleBack}
                >
                  FINISH
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Grid>
      {<ReusableModal
        open={modalOpen}
        titleText="REGISTER NEW USER"
        headers={['FULL NAME', 'EMAIL', 'PASSWORD']}
        onClose={resetState}
        onConfirm={handleOnConfirm}
        action={ActionType.Add}
        editData={modalData}
        />}
    </Box>
  );
};

export default ManageUsersPage;
