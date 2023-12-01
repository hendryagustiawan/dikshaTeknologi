import { Box, Card, Typography, Container } from '@mui/material';

import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  ({ theme }) => `
      height: 100%;
      display: flex;
      flex: 1;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
);

function DataNull() {
  return (
    <>
      <MainContent>
        <Container maxWidth="md" style={{ marginTop: 100 }}>
          <Box textAlign="center">
            <img
              alt="201"
              height={180}
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1701387388~exp=1701387988~hmac=bbe1a2f2b0c8d20bc4d9c5555fdd4b53fdc7973873b54477a1f517a62759d104"
            />
            <Typography variant="h2" sx={{ my: 2 }}>
              Data Not Found
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              Please search another Item !
            </Typography>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default DataNull;
