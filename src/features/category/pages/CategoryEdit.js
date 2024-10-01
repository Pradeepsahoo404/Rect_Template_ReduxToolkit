import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TitleCard from "../../../components/Cards/TitleCard";
import { getByIDCategory, updateCategory } from "../categoryAction";
import { getAllBrand } from "../../brand/brandAction";

const CategoryEdit = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = location;
    const { categoryId, token } = state || {};
    const [selectedIds, setSelectedIds] = useState([]);
 
    const { loading, categoryInfo } = useSelector(state => state.category);
    const { brandLists, loading: brandLoading } = useSelector(state => state.brand);
    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();

    useEffect(() => {
        if (categoryId && token) {
            dispatch(getByIDCategory({ categoryId, token }));
        }
    }, [dispatch, categoryId, token]);

    useEffect(() => {
        if (token) {
            dispatch(getAllBrand({ token }));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (categoryInfo) {
            setValue("name", categoryInfo.name || "");
            setValue("description", categoryInfo.description || "");
            const selectedBrandIds = categoryInfo.brands ? categoryInfo.brands.map(brand => brand._id) : [];
            setSelectedIds(selectedBrandIds);
            setValue("brands", selectedBrandIds);
        }
    }, [categoryInfo, setValue]);

    const selectHandleChange = (event) => {
        const { value } = event.target;
        const selected = typeof value === 'string' ? value.split(',') : value;
        setSelectedIds(selected);
        setValue('brands', selected);
    };

    const submitForm = async(data) => {
        const formData = new FormData();
        formData.append('name', getValues("name"));
        formData.append('description', getValues("description"));
        const brands = getValues("brands");
        brands.forEach(brandId => formData.append('brands[]', brandId));

        try {
            await dispatch(updateCategory({
                formData,
                token,
                id: categoryId
            })).unwrap();
            navigate(-1); // Navigate back to the previous page on success
        } catch (err) {
            console.error("Error updating Category:", err);
        }
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

    // Ensure data is loaded before rendering the form
    if (loading || brandLoading || !categoryInfo) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TitleCard title="Update Category" topMargin="mt-2">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="flex flex-col justify-center mt-4">
                            <label htmlFor="name" className="mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Name"
                                className="input input-bordered input-primary w-full max-w-xl"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                        </div>
                        {/* Description */}
                        <div className="flex flex-col justify-center mt-12">
                            <label htmlFor="description" className="mb-2">Description</label>
                            <textarea
                                id="description"
                                placeholder="Description"
                                className="textarea textarea-bordered textarea-primary textarea-md w-full max-w-xl"
                                {...register("description", { required: "Description is required" })}
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
                                >
                                    {brandLists.map(({ _id, name }) => (
                                        <MenuItem key={_id} value={_id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <input
                                    type="hidden"
                                    {...register('brands', { required: 'Please select at least one brand' })}
                                    value={selectedIds}
                                />
                                {errors.brands && <span className="text-red-600">{errors.brands.message}</span>}
                            </FormControl>
                        </div>
                    </div>

                    <div className="divider mt-[50px] "></div>

                    <div className="flex gap-4 items-center justify-center">
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

export default CategoryEdit;
