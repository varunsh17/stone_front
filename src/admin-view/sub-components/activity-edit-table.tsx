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
import { ActivityDetails, AddActivityRequest, BLDDetails, LeaseDetails } from '../business-logic/admin-interfaces';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ActionType, EditPageProps } from './lease-details-table';
import { addActivity, deleteActivity, getActivity, updateActivity } from '../business-logic/handle-activity-modifications';
import { SessionContextValue, SessionStateContext } from '../../sessionContext';

const ActEditPage: React.FC = () => {
  const location = useLocation();
  const data = location.state?.data;
  const { session } = useContext(SessionStateContext) as SessionContextValue;
  const responseData: EditPageProps = JSON.parse(data);
  const [tableEntry, setTableEntry] = useState<string[]>(responseData.tableData);
  const [editkey, setEditKey] = useState<string>('');
  const [editData, setEditData] = useState<LeaseDetails | BLDDetails | ActivityDetails>();
  const [open, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<ActionType>(ActionType.Edit);

  const handleEdit = useCallback(async (data: string) => {
    setAction(ActionType.Edit);
    setEditKey(data);
    let response;
    response = await getActivity(data, session);
    if (response) {
      setEditData(response);
    }
  }, [setAction, setEditKey, setEditData, session]);

  const handleDelete = async (data: string) => {
    const response = await deleteActivity(data, session);
    if (response) {
      setTableEntry(tableEntry.filter(i => i !== data));
    }
  };

  const getReqData = (textfieldsVal: { [id: string]: string }) => {
    let data: AddActivityRequest = {
      type: '',
      management_fee: 0,
      description: ''
    };
    if (textfieldsVal) {
      data = {
        type: textfieldsVal['TYPE'],
        management_fee: Number(textfieldsVal['MANAGEMENT FEE']),
        description: textfieldsVal['DESCRIPTION']
      };
    }
    return data;
  };

  const handleOnConfirm = async (action: ActionType, textfieldsVal: { [id: string]: string }) => {
    let response;
    if (action === ActionType.Edit && textfieldsVal) {
      response  = await updateActivity(getReqData(textfieldsVal), session);
    } else if (action === ActionType.Add && textfieldsVal) {
      response  = await addActivity(getReqData(textfieldsVal), session);
    }
    if (response) {
      // show success modal
      if (action === ActionType.Add && textfieldsVal) {
        setTableEntry(tableEntry
          .filter(i => i !== editkey)
          .concat(textfieldsVal['TYPE']));
      }
      setEditData(undefined);
    }
  };

  const handleOnAdd = async () => {
    setEditData({type: '', managementFee: 0, description: ''});
    setAction(ActionType.Add);
    setEditKey('');
    setOpen(true);
  };

  const resetState = () => {
    setEditData(undefined); setEditKey('');
    setOpen(false);
  };

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
                  <IconButton aria-label="edit" onClick={() => {}}>
                    <ArrowBackIcon style={{ color: '#FFFFFF', height: "20px", width: "20px" }} />
                  </IconButton>
                </Grid>
                <Grid item xs={7} style={{ textAlign: 'justify' }}>
                  <Typography variant="h6" fontSize="18px" align="left" color="white" fontWeight="bold">EDIT ACTIVITY</Typography>
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
                  onClick={handleOnAdd}>
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
        titleText={`${action === ActionType.Edit ? 'EDIT' : 'ADD'} ACTIVITY`}
        headers={['TYPE', 'MANAGEMENT FEE', 'DESCRIPTION']}
        onClose={resetState}
        onConfirm={handleOnConfirm}
        action={action}
        editData={editData}
      />}
      </Box>
  );
};

export default ActEditPage;
