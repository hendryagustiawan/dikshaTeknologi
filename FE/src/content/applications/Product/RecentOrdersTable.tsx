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
import { deleteProduct, getProducts } from '../../../store/actions/product';
import { errorMsg, successMsg } from 'src/components/Alert/ToasNotification';
import { Link as RouterLink } from 'react-router-dom';
import DataNull from 'src/components/DataNull';

interface RecentOrdersTableProps {
  className?: string;
}

const RecentOrdersTable: FC<RecentOrdersTableProps> = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const ProductList = useSelector(
    (state: RootState) => state.product.list.values
  );

  const handleDelete = (id: number) => {
    if (id)
      dispatch(deleteProduct(id))
        .unwrap()
        .then((response) => {
          successMsg(response.message);
          dispatch(getProducts());
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
      <CardHeader title="Product" />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name Product</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Category</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ProductList.map((product) => {
              return (
                <TableRow hover key={product.id}>
                  <RouterLink
                    to={`/management/product-variant/variant/${product.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        sx={{
                          '&:hover': {
                            color: '#2196f3',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {product.name}
                      </Typography>
                    </TableCell>
                  </RouterLink>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {product.plu}
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
                      {product.ProductCategory.name}
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
                      {product.active ? 'Active' : 'Not Active'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <RouterLink
                      to={`/management/product/edit/${product.id}`}
                      state={{
                        id: product.id,
                        name: product.name,
                        plu: product.plu,
                        active: product.active,
                        product_category_id: product.ProductCategory.id
                      }}
                      style={{ textDecoration: 'none' }}
                    >
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
                    </RouterLink>

                    <Button
                      type="button"
                      onClick={() => handleDelete(product.id)}
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
