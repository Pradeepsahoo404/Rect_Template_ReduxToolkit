import React, { useEffect } from 'react'
import ProductList from '../pages/ProductList'
import { useDispatch , useSelector } from 'react-redux'
import { getAllProduct } from '../productAction'
import { setPageTitle } from '../../common/headerSlice'

const ProductListHeader = () => {
  const dispatch = useDispatch()
  const {userToken} = useSelector((state) => state.auth)
  const {productLists} = useSelector((state)=>state.product)
  useEffect(()=>{
    dispatch(setPageTitle({title : "Product"}))
}, [])

  useEffect(()=>{
    dispatch(getAllProduct({token : userToken}))
  } , [dispatch , userToken])
  
  return (
    <ProductList ProductLists={productLists}/>
    )
}

export default ProductListHeader
