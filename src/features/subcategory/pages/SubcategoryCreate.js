import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import TitleCard from '../../../components/Cards/TitleCard';
import { useDispatch, useSelector } from 'react-redux';
import { createSubCategory } from '../subcategoryAction';
import { getAllCategory } from '../../category/categoryAction';

const SubcategoryCreate = () => {
  const {userToken} = useSelector((state) => state.auth)
  const {loading , success} = useSelector((state) => state.subCategory)
  const {categoryLists} = useSelector((state) => state.category)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(()=>{
    if(loading){
      navigate('/app/subcategory-list')
    }
  } , [navigate , success , loading])


  useEffect(()=>{
    dispatch(getAllCategory({token : userToken}))
  } , [dispatch , userToken])


  const selectHandleChange = (event) => {
    const {
      target : {value},
    } = event

    const selected = typeof value === 'string' ? value.split(',') : value;
    setSelectedIds(selected);
    setValue('categoryId', selected);  // Update form value directly
  };

console.log(selectedIds , "selectedIds")

  const submitForm = (formData)=>{
    dispatch(createSubCategory(
      {
        data : formData,
        token : userToken
      }
    ))
  }

  return (
    <TitleCard title="Create Sub Categories" topMargin="mt-2">
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

        {/* category */}
        <div className="flex flex-col justify-center">
          <label htmlFor="categoryId" className="mb-2">Category</label>
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              id="categoryId"
              value={selectedIds}
              onChange={selectHandleChange}
             
              // className="input input-bordered input-primary w-full max-w-xl"
            >
              {categoryLists.map(({ _id, name }) => (
                <MenuItem key={_id} value={_id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {/* Hidden Input Field to Register Selected Brands */}
            <input
              type="hidden"
              {...register('categoryId', { required: 'Please select at least category' })}
              value={selectedIds}
            />
            {errors.categoryId && <span className="text-red-600">{errors.categoryId.message}</span>}
          </FormControl>
        </div>
      </div>

      <div className="divider mt-[50px]"></div>

      <div className="flex gap-4 items-center justify-center">
        <Button
          className="float-right"
          variant="outlined"
          color="error"
          onClick={() => navigate('/app/subcategory-list')}
        >
          Cancel
        </Button>
        <Button color="success" className="float-right" variant="contained" type="submit">
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
  </TitleCard> 
  )
}

export default SubcategoryCreate
