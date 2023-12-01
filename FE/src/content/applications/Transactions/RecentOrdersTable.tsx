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

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store';
import { getTransactions } from 'src/store/actions/transaction';
import DataNull from 'src/components/DataNull';

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

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  if (TransactionList.length === 0) {
    return <DataNull />;
  }

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
