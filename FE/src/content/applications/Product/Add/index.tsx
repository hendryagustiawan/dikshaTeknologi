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
import { addProduct } from 'src/store/actions/product';
import { useNavigate } from 'react-router';
import { errorMsg, successMsg } from 'src/components/Alert/ToasNotification';

export default function ProductAdd() {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState('');
  const [plu, setPlu] = useState('');

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleRadioChange = (event: any) => {
    setIsActive(event.target.value);
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

  const handleSave = (e: any) => {
    e.preventDefault();

    dispatch(
      addProduct({
        name,
        plu,
        active: isActive,
        product_category_id: selectedValue
      })
    )
      .then(() => {
        successMsg('Success Add Product');
        navigate('/management/product/items');
      })
      .catch((error) => {
        errorMsg(error.response.data.message);
      });
  };

  return (
    <>
      <Typography variant="h1" align="center" mt={10}>
        ADD PRODUCT
      </Typography>
      <Stack
        component="form"
        onSubmit={handleSave}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="plu"
          id="plu"
          value={plu}
          onChange={(e) => setPlu(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
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
            value={isActive}
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
