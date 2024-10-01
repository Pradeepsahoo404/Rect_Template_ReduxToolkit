import React, { useEffect } from 'react'
import SubcategoryList from "../pages/SubcategoryList"
import { useDispatch , useSelector } from 'react-redux'
import { getAllSubCategory } from '../subcategoryAction'
import { setPageTitle } from '../../common/headerSlice'
const SubcategoryListHeader = () => {
    const dispatch = useDispatch();
    const {subCategoryLists} = useSelector((state) => state.subCategory)
    const {userToken} = useSelector(state => state.auth)

    useEffect(()=>{
        dispatch(setPageTitle({title : "Sub Categories"}))
    }, [])

    useEffect(()=>{
        dispatch(getAllSubCategory({token : userToken}))
    } , [dispatch , userToken])
  return (
        <SubcategoryList subCategoryLists={subCategoryLists}/> 
  )
}

export default SubcategoryListHeader