import React, { useEffect } from 'react'
import CategoryList from '../pages/CategoryList'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../categoryAction'
import { setPageTitle } from '../../common/headerSlice'

const CategoryListHeader = () => {

    const dispatch = useDispatch();
    const { categoryLists } = useSelector((state) => state.category);
    const {userToken}  = useSelector(state => state.auth)

    useEffect(()=>{
        dispatch(setPageTitle({title : "Category"}))
    }, [])

    useEffect(() => {
      dispatch(getAllCategory({token : userToken}));
    }, [dispatch , userToken]);


  return (
    <CategoryList categoryLists = {categoryLists}/>
    
  )
}

export default CategoryListHeader