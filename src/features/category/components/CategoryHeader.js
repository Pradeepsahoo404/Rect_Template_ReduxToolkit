import React from 'react'
import { useEffect } from 'react'
import { setPageTitle } from '../../common/headerSlice'
import CategoryCreate from "../pages/CategoryCreate.js"
import { useDispatch } from 'react-redux'

const CategoryHeader = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setPageTitle({title : "Categories"}))
    })
  return (
    <CategoryCreate/>
  )
}

export default CategoryHeader