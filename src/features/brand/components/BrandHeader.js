import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../common/headerSlice.js'
import BrandCreate from "../page/brandCreate.js"

function BrandHeader(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Brands"}))
      }, [])


    return(
        <BrandCreate/>
    )
}

export default BrandHeader