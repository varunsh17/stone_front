import React from 'react';
import { Grid, Typography } from '@mui/material';

const AdminFooter: React.FC = () => {
  return (
    <Grid item xs={12} sx={{ mt: '48px', paddingTop: "16px", backgroundColor: '#8F8F8F', paddingBottom: '16px' }}>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} className="footerContent">
        <Grid sx={{ marginLeft: '60px', color: 'white' }} className="footerLeft">
          <Typography variant="body2">
            7373 Wisconsin Avenue • Suite 700 • Bethesda MD 20814 • 301.913.9610
          </Typography>
        </Grid>
        <Grid sx={{ marginRight: '60px' }} className="footerRight">
          <Typography variant="body2">
            © 2024 Stonebridge, All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminFooter;
