
import * as React from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { getAllLease } from '../business-logic/handle-lease-modifications';
import { EditPageProps } from './lease-details-table';
import { getAllBuilding } from '../business-logic/handle-building-modifications';
import { getAllActivity } from '../business-logic/handle-activity-modifications';
import { useContext } from 'react';
import { SessionContextValue, SessionStateContext } from '../../sessionContext';

export enum CatogoryType {
  LEASE = 'lease',
  BUILDING = 'building',
  ACTIVITY = 'activity'
}

const EditDetailsTable: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useContext(SessionStateContext) as SessionContextValue;

  const handleEditCLick = async (type: CatogoryType) => {
    let responseData: EditPageProps;
    switch (type) {
      case CatogoryType.LEASE:
        responseData = await getAllLease(type, session)!;
        navigate('/lease-edit-table', {state: {data: JSON.stringify(responseData)}});
        break;
      case CatogoryType.BUILDING:
        responseData = await getAllBuilding(type, session)!;
        navigate('/bld-edit-table', {state: {data: JSON.stringify(responseData)}});
        break;
      case CatogoryType.ACTIVITY:
        responseData = await getAllActivity(type, session)!;
        navigate('/act-edit-table', {state: {data: JSON.stringify(responseData)}});
        break;
      default: 
      break;
    }
  };

  return (
    <Box sx={{ mt: "28px" }} style={{width: '100%'}}>
      <Grid container justifyContent="center">
      <Grid item xs={10} sx={{ borderRadius: "6px", border: "1px solid #0000001A", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)" }}>
          <Grid container data-testid='editDetails' justifyContent="center" alignItems="center" style={{borderRadius: '6px 6px 0 0'}} sx={{ backgroundColor: "#7992B9", p: 2.5}}>
            <Grid item xs={12}>
            <Typography variant="h6" align="center" color="white" fontWeight="bold" fontSize="19px">EDIT DETAILS</Typography>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center" sx={{ backgroundColor: "#F7F9FB", p: 2, borderTop: 0, border: "0.6px solid #0000000D" }}>
            <Grid item xs={8}>
            <Typography variant="subtitle1" color={'#3F639BE6'} sx={{paddingLeft: '28px'}}>EDIT LEASE NUMBER</Typography>
            </Grid>
            <Grid item xs={4} alignSelf={'right'} justifyContent={'right'} style={{display:'flex', paddingLeft: '28px'}}>
              <IconButton aria-label="edit" onClick={() => handleEditCLick(CatogoryType.LEASE)}>
              <EditIcon sx={{ color: '#3F639B', height: '22px', width: '22px' }} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center" sx={{ backgroundColor: "#F7F9FB", p: 2, borderTop: 0, border: "0.6px solid #0000000D" }}>
            <Grid item xs={8}>
            <Typography variant="subtitle1" color={'#3F639BE6'} sx={{ paddingLeft: '28px' }}>EDIT BUILDING NUMBER</Typography>
            </Grid>
            <Grid item xs={4} alignSelf={'right'} justifyContent={'right'} style={{display:'flex'}}>
              <IconButton aria-label="edit" onClick={() => handleEditCLick(CatogoryType.BUILDING)}>
              <EditIcon sx={{ color: '#3F639B', height: '22px', width: '22px'}} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center" sx={{ backgroundColor: "#F7F9FB", p: 2, borderTop: 0, border: "0.6px solid #0000000D" }}>
            <Grid item xs={8}>
            <Typography variant="subtitle1" color={'#3F639BE6'} sx={{ paddingLeft: '28px' }}>EDIT ACTIVITY TYPE / DESCRIPTION / MANAGEMENT FEE</Typography>
            </Grid>
            <Grid item xs={4} alignSelf={'right'} justifyContent={'right'} style={{display:'flex'}}>
              <IconButton aria-label="edit" onClick={() => handleEditCLick(CatogoryType.ACTIVITY)}>
              <EditIcon sx={{ color: '#3F639B', height: '22px', width: '22px'}} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditDetailsTable;