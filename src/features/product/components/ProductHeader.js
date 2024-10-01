import React from 'react'
import { useEffect } from 'react'
import { setPageTitle } from '../../common/headerSlice'
import { useDispatch } from 'react-redux'
import ProductCreate from '../pages/ProductCreate'

const ProductHeader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({title : "Product"}))
  })
  return (
   <ProductCreate/> 
  )
}

export default ProductHeader
