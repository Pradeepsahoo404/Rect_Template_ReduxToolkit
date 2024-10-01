import React from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { createBrand, getByIDBrand, updateBrand } from "../brandAction";
import { useLocation } from "react-router-dom";

const BrandEdit = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state }  = location
  const { brandId , token } = state || {};

  const { loading , message , error , success , brandInfo} = useSelector(state => state.brand)

  // const { register, handleSubmit, formState: { errors },} = useForm();
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();

  useEffect(() => {
    dispatch(getByIDBrand({brandId : brandId , token : token}))
  }, []);

  
  useEffect(() => {
    if (brandInfo) {
      setValue("name", brandInfo.name || "");
      setValue("description", brandInfo.description || "");
      setValue("website", brandInfo.website || "");
      setValue("country", brandInfo.country || "");
    }
  }, [brandInfo , setValue]);
  

  const submitForm = async(data) => {
    const formData = new FormData();
    formData.append('name', getValues("name"));
    formData.append('description', getValues("description"));
    formData.append('website', getValues("website"));
    formData.append('country', getValues("country"));
    // formData.append('logo', data.logo[0])
    if (data.logo.length > 0) {
      formData.append('logo', data.logo[0]);
    }

    try {
      await dispatch(updateBrand({
        formData,
        token: token,
        id: brandId
      })).unwrap(); // Use unwrap() to handle the promise correctly
      navigate(-1); // Navigate back to the previous page on success
    } catch (err) {
      console.error("Error updating brand:", err);
    }
  }

  return (
    <>
      <TitleCard title="Update-brand" topMargin="mt-2">
        <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* name */}
          <div className="flex flex-col justify-center mt-4">
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              // className='w-full py-2 px-3 mb-3 border rounded border-gray-400'
              className="input input-bordered input-primary w-full max-w-xl"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>
          {/* Description */}
          <div className="flex flex-col justify-center mt-12">
            <label htmlFor="description" className="mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              className="textarea textarea-bordered textarea-primary textarea-md w-full max-w-xl"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <span className="text-red-600">{errors.description.message}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WebSite */}
          <div className="flex flex-col justify-center mt-4">
            <label htmlFor="website" className="mb-2">
              Website
            </label>
            <input
              type="text"
              id="website"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xl"
              {...register("website", { required: "Website is required" })}
            />
            {errors.website && (
              <span className="text-red-600">{errors.website.message}</span>
            )}
          </div>

          {/* logo */}
          <div className="flex flex-col justify-center mt-4">
            <label htmlFor="logo" className="mb-2">
              Logo
            </label>
            <input
              id="logo"
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xl"
              {...register("logo")}
            />
            {errors.logo && (
              <span className="text-red-600">{errors.logo.message}</span>
            )}
          </div>

          {/* Country */}
          <div className="flex flex-col justify-center mt-4">
            <label htmlFor="country" className="mb-2">
              Country
            </label>
            <input
              type="text"
              id="country" 
             placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xl"
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && (
              <span className="text-red-600">{errors.country.message}</span>
            )}
          </div>
        </div>

        <div className="divider mt-[50px] "></div>

        <div className=" flex gap-4 items-center justify-center">
          <Button className="float-right" variant="outlined" color="error" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button color="success" className="float-right" variant="contained" type="submit">
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </div>
        </form>
      </TitleCard>
    </>
  );
};

export default BrandEdit;
