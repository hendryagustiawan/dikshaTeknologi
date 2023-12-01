import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../store';
import { updateProduct } from 'src/store/actions/product';
import { useLocation, useNavigate } from 'react-router';
import { errorMsg, successMsg } from 'src/components/Alert/ToasNotification';
import { EditProduct } from 'src/models/product';

export default function ProductEdit() {
  const { state } = useLocation();
  const { id, name, plu, product_category_id, active } = state as EditProduct;

  const [data, setData] = useState([]);

  const [inputCategory, setInputCategory] = useState(product_category_id);
  const [inputActive, setInputActive] = useState(active);
  const [inputName, setInputName] = useState(name);
  const [inputPlu, setInputPlu] = useState(plu);

  const handleChange = (event: any) => {
    setInputCategory(event.target.value);
  };

  const handleRadioChange = (event: any) => {
    setInputActive(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/product-category/',
          {
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = (e: any) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        data: {
          name: inputName,
          plu: inputPlu,
          active: inputActive,
          product_category_id: inputCategory
        },
        id
      })
    )
      .then(() => {
        successMsg('Success Edit Product');
        navigate('/management/product/items');
      })
      .catch((error) => {
        errorMsg(error.response.data.message);
      });
  };

  return (
    <>
      <Typography variant="h1" align="center" mt={10}>
        EDIT PRODUCT
      </Typography>
      <Stack
        component="form"
        onSubmit={handleEdit}
        sx={{
          width: '100ch',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem',
          margin: 'auto',
          marginTop: '10vh',
          alignItems: 'center'
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          label="name"
          id="name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <TextField
          fullWidth
          label="plu"
          id="plu"
          value={inputPlu}
          onChange={(e) => setInputPlu(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputCategory}
            label="Select Option"
            onChange={handleChange}
          >
            {data.map((el) => {
              return (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend" id="demo-row-radio-buttons-group-label">
            Active
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={inputActive}
            onChange={handleRadioChange}
          >
            <FormControlLabel value={true} control={<Radio />} label="Active" />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Not Active"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ justifySelf: 'end', alignSelf: 'end' }}>
          <Button variant="contained" type="submit">
            submit
          </Button>
        </Box>
      </Stack>
    </>
  );
}
