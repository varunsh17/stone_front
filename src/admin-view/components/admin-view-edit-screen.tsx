import React from 'react';
import { Grid, Box} from '@mui/material';
import EditDetailsTable from '../sub-components/edit-table-page';
import NavBar from '../../common-components/navbar';
import HeaderImage from '../../common-components/header-image';
import Footer from '../../common-components/footer';

const AdminView: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#F8F8F8", minHeight: "100vh" }}>
      <NavBar />
      <Grid container spacing={0} sx={{ mt: 0 }}>
        <HeaderImage />
        <EditDetailsTable />
        <Footer />
      </Grid>
    </Box>
  );
};

export default AdminView;

