import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Products from './Products';
import Transaction from './Transaction';
import ProductList from './ProductList';

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Shopey</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Products />
          </Grid>
          <Grid item lg={4} xs={12}>
            <Transaction />
          </Grid>
          <Grid item xs={12}>
            <ProductList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
