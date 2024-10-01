import moment from "moment"
import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate , Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import { createBrand } from "../brandAction";
// import SnackbarWithDecorators from "../../toaster/SnackbarWithDecorators.js"

function BrandCreate(){

     const { loading , message , error , success , brandInfo} = useSelector(state => state.brand)
     
     const {userToken}  = useSelector(state => state.auth)
    //  console.log(userToken , "userToken")
   
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const { register , handleSubmit , formState : {errors}} = useForm()
    // const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
      // if(success){
      //   setSnackbarOpen(true)
      // }
      if (loading) {
        navigate('/app/brand-list');
      }
    }, [ navigate , loading , success]); 
    
  

    const submitForm = (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("website", data.website);
      formData.append("country", data.country);
      formData.append("logo", data.logo[0]); // Ensure `logo` is a File object

      // for (let [key, value] of formData.entries()) {
      //     console.log(key, value); // Verify FormData contents
      // }

      dispatch(
        createBrand({
          formData,
          token: userToken,
        })
      );
    }
  

    return(
        <>
            
            <TitleCard title="Create-brand" topMargin="mt-2">
              <form onSubmit={handleSubmit(submitForm)}>

              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* name */}
                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='name' className='mb-2'>Name</label>
                  <input
                    type='text'
                    id='name'
                    placeholder="Name"
                    // className='w-full py-2 px-3 mb-3 border rounded border-gray-400'
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                </div>
            {/* Description */}
                <div className='flex flex-col justify-center mt-12'>
                    <label htmlFor="description" className="mb-2">Description</label>
                        <textarea
                                id="description"
                                placeholder="Description"
                                className="textarea textarea-bordered textarea-primary textarea-md w-full max-w-xl"
                                {...register('description', { required: 'Description is required' })}
                        />
                {errors.description && <span className="text-red-600">{errors.description.message}</span>}

                </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* WebSite */}
                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='website' className='mb-2'>Website</label>
                  <input
                    type='text'
                    id='website'
                    placeholder="Type here"
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('website', { required: 'Website is required' })}
                  />
                  {errors.website && <span className='text-red-600'>{errors.website.message}</span>}
                </div>

                
                {/* logo */}
                <div className='flex flex-col justify-center mt-4'>   
                <label htmlFor='logo' className='mb-2'>Logo</label>
                <input
                id="logo"
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xl"
                {...register('logo', { required: 'logo is required' })} 
                />
                {errors.logo && <span className='text-red-600'>{errors.logo.message}</span>}
                </div>

                {/* Country */}
                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='country' className='mb-2'>Country</label>
                  <input
                    type='text'
                    id='country'
                    placeholder="Type here"
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('country', { required: 'Country is required' })}
                  />
                  {errors.country && <span className='text-red-600'>{errors.country.message}</span>}
                </div>

                </div>


                <div className="divider mt-[50px] " ></div>  

                <div className=" flex gap-4 items-center justify-center">
                   <Button   className="float-right" variant="outlined" color="error">
                    Cancel
                    </Button>
                    <Button color="success" className="float-right" variant="contained" type="submit">
                    {loading ? 'Creating...' : 'Create'}
                    </Button>
                </div>
                </form>

            </TitleCard>

      {/* {loading ?
            <SnackbarWithDecorators
        message={message}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      /> : 'Creating...'} */}
        </>
    )
}


export default BrandCreate