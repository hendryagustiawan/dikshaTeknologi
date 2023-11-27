import { FC, ChangeEvent, useState, useEffect } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store';
import {
  deleteTransaction,
  getTransactions
} from 'src/store/actions/transaction';
import { errorMsg, successMsg } from 'src/components/Alert/ToasNotification';

interface RecentOrdersTableProps {
  className?: string;
}

const RecentOrdersTable: FC<RecentOrdersTableProps> = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const TransactionList = useSelector(
    (state: RootState) => state.transactions.list.values
  );

  const handleDelete = (id: number) => {
    if (id)
      dispatch(deleteTransaction(id))
        .unwrap()
        .then((response) => {
          successMsg(response.message);
          dispatch(getTransactions());
        })
        .catch((error) => {
          errorMsg(error.response.data.message);
        });
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Transaction" />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction NO</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TransactionList.map((transaction) => {
              return (
                <TableRow hover key={transaction.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction.transaction_no}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      }).format(transaction.total_amount)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction.active ? 'Active' : 'Not Active'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Button
                      type="button"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={10}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default RecentOrdersTable;
