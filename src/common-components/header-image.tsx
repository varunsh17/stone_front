import React from 'react';
import { Grid } from '@mui/material';
import { ReactComponent as BuildingSVG } from './bld-2.svg';

const HeaderImage: React.FC = () => {
  return (
    <Grid item xs={12} sx={{ p: 0, m: 0 }}>
      <BuildingSVG className='headerimage' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </Grid>
  );
};

export default HeaderImage;
