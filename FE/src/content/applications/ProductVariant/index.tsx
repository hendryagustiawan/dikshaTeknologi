import { useEffect } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  IconButton,
  Table,
  Typography,
  useTheme,
  Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { getProductVariant } from 'src/store/actions/productVariant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store';
import { useParams } from 'react-router-dom';

export default function ImgMediaCard() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      dispatch(getProductVariant(numericId));
    }
  }, [dispatch, id]);

  const productVariantList = useSelector(
    (state: RootState) => state.productVariant.list.values
  );

  const theme = useTheme();
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', margin: '25px' }}
    >
      {productVariantList.map((el) => {
        return (
          <Card key={el.id} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={el.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {el.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category : {el.Product.name}
              </Typography>
              <Typography my={3} variant="body2" color="text.secondary">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(el.price)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
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
              </Button>
              <Button type="button">
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
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}
