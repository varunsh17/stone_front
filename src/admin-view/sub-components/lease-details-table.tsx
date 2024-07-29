import * as React from 'react';
import { Grid, Typography, Box, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ReactComponent as DeleteIcon } from './delete-outline.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavBar from '../../common-components/navbar';
import HeaderImage from '../../common-components/header-image';
import Footer from '../../common-components/footer';
import { useLocation } from 'react-router-dom';
import ReusableModal from '../../common-components/modal-edit-value';
import { ActivityDetails, AddLeaseRequest, BLDDetails, LeaseDetails } from '../business-logic/admin-interfaces';
import { useCallback, useContext, useEffect, useState } from 'react';
import { addLease, deleteLease, getLease, updateLease } from '../business-logic/handle-lease-modifications';
import { SessionContextValue, SessionStateContext } from '../../sessionContext';

export interface EditPageProps {
  tableData: string[];
}

// reusable modal can handle data based on two actionTypes 
export enum ActionType {
  Edit = 'update',
  Add = 'add'
}

const LeaseEditPage: React.FC = () => {
  const location = useLocation();
  const data = location.state?.data; // we're fetching the props from useLocation() hook
  const { session } = useContext(SessionStateContext) as SessionContextValue; 
  // maintaining sessionContext for authentication purpose and navigation
  const responseData: EditPageProps = JSON.parse(data);
  const [tableEntry, setTableEntry] = useState<string[]>(responseData.tableData);
  const [editkey, setEditKey] = useState<string>('');
  const [editData, setEditData] = useState<LeaseDetails | BLDDetails | ActivityDetails>();
  const [open, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<ActionType>(ActionType.Edit);

  // handleEdit() function fetches the lease details when edit icon is clicked
  const handleEdit = useCallback(async (data: string) => {
    setAction(ActionType.Edit); // set correct action for reusable modal
    setEditKey(data);
    let response;
    response = await getLease(data, session); // making get call 
    if (response) {
      setEditData(response); // setData for the modal to use
    }
  }, [setAction, setEditKey, setEditData, session]);

  // handleDelete() for deleting the table entry
  const handleDelete = async (data: string) => {
    const response = await deleteLease(data, session);
    if (response) { // once we get a response back, we're removing the row- there's no need to fetch all the entries and re-render
      setTableEntry(tableEntry.filter(i => i !== data));
    }
  };

  // just a simple data modeling function- could be moved out of the component, but not a necessity 
  const getReqData = (textfieldsVal: { [id: string]: string }) => {
    let data: AddLeaseRequest = {
      lease_no: '',
      bill_to: ''
    };
    if (textfieldsVal) {
        data = {
          lease_no: textfieldsVal['LEASE NO.'],
          bill_to: textfieldsVal['BILL TO']
        };
    }
    return data;
  };
  // handleOnConfirm() handles confirm button click on reusable modal
  // based on action and data we get back from the modal
  const handleOnConfirm = async (action: ActionType, textfieldsVal: { [id: string]: string }) => {
    let response;
    if (action === ActionType.Edit && textfieldsVal) {
      response  = await updateLease(getReqData(textfieldsVal), session); // edit lease data
    } else if (action === ActionType.Add && textfieldsVal) {
      response  = await addLease(getReqData(textfieldsVal), session); // add lease data
    }
    if (response) {
      // show success modal
      if (action === ActionType.Add && textfieldsVal) { // for Add lease again we update and add a new row to the table
        setTableEntry(tableEntry
          .filter(i => i !== editkey)
          .concat(textfieldsVal['LEASE NO.']));
      }
      setEditData(undefined); // setEditData to undefined to close and refresh the modal state
    }
  };
  const resetState = () => { // handle state cleanup and handle close button click
    setEditData(undefined); 
    setEditKey('');
    setOpen(false);
  };

  // handles clicking on ADD button and initialize the modal with empty states
  const handleOnAdd = () => { 
    setEditData({lease_no: '', bill_to: ''});
    setAction(ActionType.Add);
    setEditKey('');
    setOpen(true);
  };

  // this useffect maintains opening or closing the modal based on editData
  useEffect(() => {
    if (editData) {
      setOpen(true);
    } else {
      setOpen(false);
      resetState();
    }
  }, [editData]);

  return (
    <Box sx={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <NavBar/>
      <Grid container spacing={0} sx={{ mt: 0 }}>
        <HeaderImage/>
        <Box sx={{ mt: "28px", width: "100%" }}>
          <Grid container justifyContent="center">
            <Grid item xs={10} sx={{borderRadius: "6px", border:"1px solid #0000001A", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",}}>
              <Grid container data-testid="editDetails" justifyContent="center" alignItems="center" sx={{ borderRadius: "6px 6px 0 0", backgroundColor: "#4CAF50", p: 2 }}>
                <Grid item xs={5} style={{ textAlign: 'justify' }}>
                  <IconButton aria-label="edit" onClick={() => window.history.back()}>
                    <ArrowBackIcon style={{ color: '#FFFFFF', height: "20px", width: "20px" }} />
                  </IconButton>
                </Grid>
                <Grid item xs={7} style={{ textAlign: 'justify' }}>
                  <Typography variant="h6" fontSize="18px" align="left" color="white" fontWeight="bold">EDIT LEASE NUMBER</Typography>
                </Grid>
              </Grid>

              {tableEntry.map((data: string, index: number) => (
                <Grid
                  container
                  key={index}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    backgroundColor: "#FCFCFC",
                    p: 1,
                    borderTop: 0,
                    border: "0.6px solid #0000000D",
                  }}
                >
                  <Grid item xs={8}>
                    <Typography variant="subtitle1" style={{ textAlign: 'left', paddingLeft: "36px" }}>{data}</Typography>
                  </Grid>
                  <Grid item xs={4} alignSelf={'right'} justifyContent={'right'} style={{ display: 'flex', paddingRight: "36px", gap: "8px" }}>
                    <IconButton aria-label="edit" onClick={() => handleEdit(data)}>
                      <EditIcon style={{ color: '#45A0C8', height: "20px", width: "20px" }} />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(data)}>
                      <DeleteIcon style={{ color: '#D60E0E', height: "20px", width: "20px" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Grid
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
                sx={{
                  borderRadius: "0 0 6px 6px",
                  display: "flex",
                  backgroundColor: "#FCFCFC",
                  p: 3,
                  borderTop: 0,
                  border: "1px solid #0000000D",
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    marginRight: "24px",
                    padding: "6px 30px",
                    fontWeight: "600",
                    fontSize: "14.4px",
                    border: "2px solid #3F639B0",
                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)",
                  }}
                  onClick={() => handleOnAdd()}>
                  ADD
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    marginRight: "28px",
                    padding: "7px 31px",
                    fontWeight: "600",
                    fontSize: "14px",
                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)",
                  }}
                  onClick={() => window.history.back()}>
                  FINISH
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Footer/>
      </Grid>
      {<ReusableModal
        open={open}
        titleText={`${action === ActionType.Edit ? 'EDIT' : 'ADD'} LEASE NUMBER`}
        headers={['LEASE NO.', 'BILL TO']}
        onClose={resetState}
        onConfirm={handleOnConfirm}
        action={action}
        editData={editData}
      />}
      </Box>
  );
};

export default LeaseEditPage;