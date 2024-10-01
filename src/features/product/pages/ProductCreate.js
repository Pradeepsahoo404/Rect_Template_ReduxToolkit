import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from '@mui/material/Chip';
import TitleCard from "../../../components/Cards/TitleCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useForm } from "re  act-hook-form";
import ImageDnD from "./ImageDnD.js"
import { status ,sizes , colors , currencies , tags } from "../../../utils/contants.js";
import { useForm, Controller } from 'react-hook-form';
import { getAllBrand } from "../../brand/brandAction";
import { get_category_by_brand , get_subcategory_by_category } from "../productAction.js";
import { createProduct } from "../productAction.js";
const ProductCreate = () => {
  const { userToken } = useSelector((state) => state.auth);
  const { product, loading, success , categoryLists , SubCategoryLists } = useSelector((state) => state.product);

  const { brandLists } = useSelector((state) => state.brand);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedIds, setSelectedIds] = useState({
    brand : [],
    mainCategory : [],
    subCategory : [],
    currency : [],
    sizes : [],
    colors : [],
    status : [],
    tag : [],

  });
  const listOfsize = selectedIds.sizes 

  useEffect(() => {
    if (success) {
      navigate('/app/product-list');
    }
  }, [product, navigate]); // Adding navigate as a dependency for clarity
  
  useEffect(() => {
    dispatch(getAllBrand({ token: userToken }));
   
  }, [dispatch, userToken]);

  useEffect(() => {
    if (selectedIds.brand.length > 0) {
      const brandId = selectedIds.brand[0];
      if (brandId) {
        dispatch(get_category_by_brand({ brandId, token: userToken }));
        }
        const categoryId = selectedIds.mainCategory[0];
        if(categoryId){
          dispatch(get_subcategory_by_category({ categoryId, token: userToken }));
        }
    }
  }, [selectedIds.brand,selectedIds.mainCategory , userToken, dispatch]);

  //handle select change
  // const selectHandleChange = (event) => {
  //   const {name , value} = event.target;
  //   const selected = typeof value === "string" ? value.split(",") : value;
  //   // setSelectedIds(selected);
  //   setSelectedIds((prev)=>({
  //     ...prev , 
  //     [name] : selected,
  //   }))
  //   setValue(name, selected);
  //   console.log(name , "name")
  // };

  const selectHandleChange = (event) => {
    const { name, value } = event.target;
    const selected = typeof value === "string" ? value.split(",") : value;
  
    // Ensure name is properly defined
    if (name) {
      setSelectedIds((prev) => ({
        ...prev,
        [name]: selected,
      }));
  
      // Update the form value
      setValue(name, selected);
      console.log(name, "name"); // Debugging log to ensure name is correct
    } else {
      console.error("The name attribute is undefined.");
    }
  };
  
console.log("image" , images)
const submitForm = (data) => {
  // const formData = new FormData();
  // formData.append('title', data.title);
  // formData.append('desc', data.desc);
  // formData.append('vendor', data.vendor);
  // formData.append('tag', data.tag); // Convert arrays to JSON strings
  // formData.append('currency', data.currency);
  // formData.append('colors', data.colors); // Convert arrays to JSON strings
  // formData.append('brand', data.brand);
  // formData.append('subCategory', data.subCategory);
  // formData.append('mainCategory', data.mainCategory);
  // formData.append('stock', data.stock);
  // formData.append('status', data.status);
  // formData.append('sizes',data.sizes); // Convert arrays to JSON strings
  // // formData.append('org', data.org);
  // // formData.append('off', data.off);
  // // formData.append('mrp', data.mrp);
  // formData.append('name', data.name);
  // formData.append('material', data.material);

  // images.forEach((image) => {
  //   formData.append('photos', image);
  // });

  // // Manually log FormData contents
 
  const formdata =  {
    "title":data.title,
    "name": data.name,
    "desc": data.desc,
    "price": {
      "org": data.org,
      "mrp": data.mrp,
      "off": data.off
    },
    "stock" :data.stock,
    "currency" : data.currency,
    "colors" : data.colors,
    "material" : data.material,
    "tag" : data.tag,
    "vendor" : data.vendor,
    "status" : data.status,
    "sizes": data.sizes,
    "brand" : data.brand,
    "mainCategory": data.mainCategory,
    "subCategory":data.subCategory,
    // "photos" : images.map((image)=> image)
  }


  dispatch(createProduct({
    formData : formdata,
    token: userToken
  }));
};


  

  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  const steps = [
    "Basic Product Information",
    "Pricing, Stock, and Variants",
    "Additional Information and Images",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
    <TitleCard title="Create Product" topMargin="mt-2">
      <Box sx={{ width: "100%" }}>
        <div className="flex items-center justify-center mt-10">
          <Stepper activeStep={activeStep} className="max-w-[1200px] w-[80%]">
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>

        <form onSubmit={handleSubmit(submitForm)}>
          {activeStep === 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-6">
                {/* title */}
                <div className="flex flex-col justify-center">
                  <label htmlFor="title" className="mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter product title"
                    className="input input-bordered input-primary w-full max-w-xl"
                    {...register("title", { required: "title is required" })}
                  />
                  {errors.title && (
                    <span className="text-red-600">{errors.title.message}</span>
                  )}
                </div>
                {/* Name */}
                <div className="flex flex-col justify-center">
                  <label htmlFor="name" className="mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    className="input input-bordered input-primary w-full max-w-xl"
                    {...register("name", { required: "name is required" })}
                  />
                  {errors.name && (
                    <span className="text-red-600">{errors.name.message}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 mt-6 gap-6">
                {/* Description */}
                <div className="flex flex-col justify-center mt-6">
                  <label htmlFor="desc" className="mb-2">
                    Description
                  </label>
                  <textarea
                    id="desc"
                    name="desc"
                    placeholder="Enter product description  "
                    className="textarea textarea-bordered textarea-primary textarea-md w-full max-w-4xl"
                    {...register("desc", {
                      required: "Description is required",
                    })}
                  />
                  {errors.desc && (
                    <span className="text-red-600">{errors.desc.message}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-6">
                {/* brand */}
                <div className="flex flex-col justify-center">
                  <label htmlFor="brand" className="mb-0 ml-1">
                    Brand
                  </label>
                  <FormControl sx={{ m: 1, width: 350 }}>
                    <Select
                      id="brand"
                      name="brand"
                      value={selectedIds.brand}
                      onChange={selectHandleChange}

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
                      {...register("brand", {
                        required: "Please select at least brand",
                      })}
                      value={selectedIds.brand}
                    
                    />
                    {errors.brand && (
                      <span className="text-red-600">
                        {errors.brand.message}
                      </span>
                    )}
                  </FormControl>
                </div>
                {/* mainCategory */}
                <div className="flex flex-col justify-center">
                  <label htmlFor="mainCategory" className="mb-0 ml-1">
                    Category
                  </label>
                  <FormControl sx={{ m: 1, width: 350 }}>
                    <Select
                      id="mainCategory"
                      name="mainCategory"
                      value={selectedIds.mainCategory}
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
                      {...register("mainCategory", {
                        required: "Please select at least Category",
                      })}
                      value={selectedIds.mainCategory}
                    />
                    {errors.mainCategory && (
                      <span className="text-red-600">
                        {errors.mainCategory.message}
                      </span>
                    )}
                  </FormControl>
                </div>
                {/* subCategory */}
                <div className="flex flex-col justify-center">
                  <label htmlFor="subCategory" className="mb-0 ml-1">
                    Subcategory
                  </label>
                  <FormControl sx={{ m: 1, width: 350 }}>
                    <Select
                      id="subCategory"
                      name="subCategory"
                      value={selectedIds.subCategory}
                      onChange={selectHandleChange}

                      // className="input input-bordered input-primary w-full max-w-xl"
                    >
                      {SubCategoryLists.map(({ _id, name }) => (
                        <MenuItem key={_id} value={_id}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* Hidden Input Field to Register Selected Brands */}
                    <input
                      type="hidden"
                      {...register("subCategory", {
                        required: "Please select at least Subcategory",
                      })}
                      value={selectedIds.subCategory}
                    />
                    {errors.subCategory && (
                      <span className="text-red-600">
                        {errors.subCategory.message}
                      </span>
                    )}
                  </FormControl>
                </div>
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <div className="flex justify-center mt-10">
                <div className="flex gap-4">
                  {/* Original Price */}
                  <div className="form-control">
                    <label htmlFor="org" className="label">
                      <span className="label-text">Original Price</span>
                    </label>
                    <input
                      type="text"
                      id="org"
                      name="org"
                      placeholder="Enter Original Price"
                      className="input input-bordered input-primary w-full"
                      {...register("org", {
                        required: "Original Price is required",
                      })}
                    />
                    {errors.org && (
                      <span className="text-red-600 mt-1">
                        {errors.org.message}
                      </span>
                    )}
                  </div>

                  {/* MRP */}
                  <div className="form-control">
                    <label htmlFor="mrp" className="label">
                      <span className="label-text">MRP</span>
                    </label>
                    <input
                      type="text"
                      id="mrp"
                      name="mrp"
                      placeholder="Enter MRP"
                      className="input input-bordered input-primary w-full"
                      {...register("mrp", { required: "MRP is required" })}
                    />
                    {errors.mrp && (
                      <span className="text-red-600 mt-1">
                        {errors.mrp.message}
                      </span>
                    )}
                  </div>

                  {/* Discount */}
                  <div className="form-control">
                    <label htmlFor="off" className="label">
                      <span className="label-text">Discount</span>
                    </label>
                    <input
                      type="text"
                      id="off"
                      name="off"
                      placeholder="Enter Discount"
                      className="input input-bordered input-primary w-full"
                      {...register("off", { required: "Discount is required" })}
                    />
                    {errors.off && (
                      <span className="text-red-600 mt-1">
                        {errors.off.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-6">
                {/* Name */}
                    
                <div className="flex flex-col justify-center">
                  <label htmlFor="stock" className="mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="text"
                    id="stock"
                    name="stock"
                    placeholder="Stock Quantity"
                    className="input input-bordered input-primary w-full max-w-xl"
                    {...register("stock", { required: "Stock is required" })}
                  />
                  {errors.stock && (
                    <span className="text-red-600">{errors.stock.message}</span>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <label htmlFor="currency" className="mb-2">
                    Currency
                  </label>
                  <FormControl sx={{ m: 1, width: 350 }}>
                    <Select
                      id="currency"
                      name="currency"
                      value={selectedIds.currency}
                      onChange={selectHandleChange}

                      // className="input input-bordered input-primary w-full max-w-xl"
                    >
                      {currencies.map(({ _id, code, name, symbol }) => (
                    <MenuItem key={_id} value={code}>
                    {`${code} - ${name} (${symbol})`}
                  </MenuItem>
                      ))}
                    </Select>
                    {/* Hidden Input Field to Register Selected Brands */}
                    <input
                      type="hidden"
                      {...register("currency", {
                        required: "Please select currency",
                      })}
                      value={selectedIds.currency}
                    />
                    {errors.currency && (
                      <span className="text-red-600">
                        {errors.currency.message}
                      </span>
                    )}
                  </FormControl>
                </div>

                <div className="flex flex-col justify-center">
    <label htmlFor="sizes" className="mb-2">Sizes</label>
    <FormControl sx={{ m: 1, width: 350 }}>
      <Controller
        name="sizes"
        control={control}
        defaultValue={selectedIds.sizes}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Select
            id="sizes"
            name={name}
            multiple
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              selectHandleChange(event); // If custom handling is needed
            }}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((id) => {
                  const item = sizes.find(item => item._id === id);
                  return item ? <Chip key={id} label={item.name} /> : null;
                })}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {sizes.map(({ _id, name }) => (
              <MenuItem key={_id} value={_id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.sizes && (
        <span className="text-red-600">{errors.sizes.message}</span>
      )}
    </FormControl>
  </div>
{/* color */}
<div className="flex flex-col justify-center">
  <label htmlFor="colors" className="mb-2">Colors</label>
  <FormControl sx={{ m: 1, width: 350 }}>
    <Controller
      name="colors"
      control={control}
      defaultValue={selectedIds.colors}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <Select
          id="colors"
          name={name}
          multiple
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            selectHandleChange(event); // If custom handling is needed
          }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((id) => {
                const item = colors.find(item => item._id === id);
                return item ? <Chip key={id} label={item.name} /> : null;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {colors.map(({ _id, name }) => (
            <MenuItem key={_id} value={_id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
    {errors.colors && (
      <span className="text-red-600">{errors.colors.message}</span>
    )}
  </FormControl>
</div>

                <div className="flex flex-col justify-center">
                  <label htmlFor="material" className="mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    id="material"
                    name="material"
                    placeholder="Material"
                    className="input input-bordered input-primary w-full max-w-xl"
                    {...register("material", {
                      required: "Material is required",
                    })}
                  />
                  {errors.material && (
                    <span className="text-red-600">
                      {errors.material.message}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
           
            <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-6">
              {/* Name */}
              <div className="flex flex-col justify-center">
    <label htmlFor="tag" className="mb-2">Tag</label>
    <FormControl sx={{ m: 1, width: 350 }}>
      <Controller
        name="tag"
        control={control}
        defaultValue={selectedIds.tag}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Select
            id="tag"
            name={name}
            multiple
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              selectHandleChange(event); // If custom handling is needed
            }}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((tag) => {
                  const item = tags.find(item => item.name === tag);
                  return item ? <Chip key={item.name} label={item.name} /> : null;
                })}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tags.map(({ _id, name }) => (
              <MenuItem key={_id} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.tag && (
        <span className="text-red-600">{errors.tag.message}</span>
      )}
    </FormControl>
  </div>

                <div className="flex flex-col justify-center">
                  <label htmlFor="vendor" className="mb-2">
                  Vendor
                  </label>
                  <input
                    type="text"
                    name="vendor"
                    id="vendor"
                    placeholder="Vendor"
                    className="input input-bordered input-primary w-full max-w-xl"
                    {...register("vendor", {
                      required: "Vendor is required",
                    })}
                  />
                  {errors.vendor && (
                    <span className="text-red-600">
                      {errors.vendor.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <label htmlFor="status" className="mb-2">
                  Status
                  </label>
                  <FormControl sx={{ m: 1, width: 350 }}>
                    <Select
                      id="status"
                      name="status"
                      value={selectedIds.status}
                      onChange={selectHandleChange}

                      // className="input input-bordered input-primary w-full max-w-xl"
                    >
                      {status.map(({ _id, name }) => (
                        <MenuItem key={_id} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* Hidden Input Field to Register Selected Brands */}
                    <input
                      type="hidden"
                      {...register("status", {
                        required: "Please select status",
                      })}
                      value={selectedIds.status}
                    />
                    {errors.status && (
                      <span className="text-red-600">
                        {errors.status.message}
                      </span>
                    )}
                  </FormControl>
                </div>
                {/* <div className="flex flex-col justify-center">
                  <label htmlFor="currency" className="mb-2">
                    Currency
                  </label>
                  <input
                    type="text"
                    id="currency"
                    placeholder="Currency"
                    className="input input-bordered input-primary w-full max-w-xl"
                    {...register("currency", {
                      required: "Currency is required",
                    })}
                  />
                  {errors.currency && (
                    <span className="text-red-600">
                      {errors.currency.message}
                    </span>
                  )}
                </div> */}

            </div>
            <div className="mt-10">
                <label htmlFor="productImages" className="mb-2">Product Images</label>
                <ImageDnD onImagesChange={handleImagesChange} />
              </div>
                </>
          )}

    
          <div className="divider mt-[50px] " ></div>  

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button color="success" variant="contained" type="submit">
                Create
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
        </form>

        {/* {activeStep === steps.length ? (
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - you&apos;re finished
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </React.Fragment>
    )} */}
      </Box>
    </TitleCard>
  );
};

export default ProductCreate;
