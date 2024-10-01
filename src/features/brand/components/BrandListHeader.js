import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { setPageTitle } from '../../common/headerSlice';
import BrandList from '../page/BrandList.js';
import { getAllBrand } from '../brandAction.js';
const BrandListHeader = () => {

    const dispatch = useDispatch();
    
    const { brandLists} = useSelector((state) => state.brand);

    const {userToken}  = useSelector(state => state.auth)
   
    useEffect(()=>{
        dispatch(setPageTitle({title : "Brands"}))
    } , [])

    useEffect(() => {
      dispatch(getAllBrand({token : userToken}));
    }, [dispatch , userToken]);

  return (
    <div>
    <BrandList brandLists = {brandLists}/>
    </div>
  )
}

export default BrandListHeader
