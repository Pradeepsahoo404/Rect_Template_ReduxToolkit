import React from 'react'
import { useEffect } from 'react'
import { setPageTitle } from '../../common/headerSlice'
import { useDispatch } from 'react-redux'
import SubcategoryCreate from '../pages/SubcategoryCreate'

const SubcategoryHeader = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPageTitle({title : "Sub Categories"}))
  })
  return (
   <SubcategoryCreate/>
  )
}

export default SubcategoryHeader