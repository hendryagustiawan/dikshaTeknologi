import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';

function PageHeader() {
  const navigate = useNavigate();

  const changePage = () => {
    navigate('/management/product/add');
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Product
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={changePage}
        >
          add product
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
