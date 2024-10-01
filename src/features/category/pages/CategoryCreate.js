import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import TitleCard from '../../../components/Cards/TitleCard';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../categoryAction';
import { getAllBrand } from '../../brand/brandAction';

const CategoryCreate = () => {
  const { userToken } = useSelector((state) => state.auth);
  const { loading, success } = useSelector((state) => state.category);
  const { brandLists } = useSelector((state) => state.brand);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (loading) {
      navigate('/app/category-list');
    }
  }, [navigate, success ,loading]);

  useEffect(() => {
    dispatch(getAllBrand({ token: userToken }));
  }, [dispatch, userToken]);

  const theme = useTheme();

  const selectHandleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selected = typeof value === 'string' ? value.split(',') : value;
    setSelectedIds(selected);
    setValue('brands', selected);  // Update form value directly
  };

  const submitForm = (formData) => {
    dispatch(createCategory({
      data: formData,
      token: userToken,
    }));
  };
  
  // const submitForm = (data) => {
  //   console.log(data , "tstData")
  //   dispatch(createCategory({
  //     ...data,
  //     token: userToken,
  //   }));
  // };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <TitleCard title="Create Category" topMargin="mt-2">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col justify-center">
            <label htmlFor="name" className="mb-2">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="input input-bordered input-primary w-full max-w-xl"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center mt-6">
            <label htmlFor="description" className="mb-2">Description</label>
            <textarea
              id="description"
              placeholder="Description"
              className="textarea textarea-bordered textarea-primary textarea-md w-full max-w-xl"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <span className="text-red-600">{errors.description.message}</span>}
          </div>

          {/* Brands */}
          <div className="flex flex-col justify-center">
            <label htmlFor="brands" className="mb-2">Brands</label>
            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                id="brands"
                multiple
                value={selectedIds}
                onChange={selectHandleChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((id) => {
                      const item = brandLists.find(item => item._id === id);
                      return item ? <Chip key={id} label={item.name} /> : null;
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
                // className="input input-bordered input-primary w-full max-w-xl"
              >
                {brandLists.map(({ _id, name }) => (
                  <MenuItem key={_id} value={_id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {/* Hidden Input Field to Register Selected Brands */}
              <input
                type="hidden"
                {...register('brands', { required: 'Please select at least one brand' })}
                value={selectedIds}
              />
              {errors.brands && <span className="text-red-600">{errors.brands.message}</span>}
            </FormControl>
          </div>
        </div>

        <div className="divider mt-[50px]"></div>

        <div className="flex gap-4 items-center justify-center">
          <Button
            className="float-right"
            variant="outlined"
            color="error"
            onClick={() => navigate('/app/category-list')}
          >
            Cancel
          </Button>
          <Button color="success" className="float-right" variant="contained" type="submit">
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </TitleCard>
  );
};
  
export default CategoryCreate;
