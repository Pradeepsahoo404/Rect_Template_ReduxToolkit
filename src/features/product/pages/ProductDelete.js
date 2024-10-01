import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../productAction'

const ProductDelete = ({id , userToken , title ,children, isOpen , onClose}) => {
  const customStyle = {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Custom shadow
  };

  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteProduct({productId : id , token : userToken}))
    onClose(); 
  }
  return (
    <div>
         <>
    {isOpen && (
     <dialog className="modal" open>
     <div className="modal-box"  style={customStyle}>
       <h3 className="font-bold text-lg">{title}</h3>
            <div className="py-4">
              {children}
            </div>
            <div className="modal-action">
              {/* <button className="btn" onClick={onClose}>Cancel</button>
              <button className="btn btn-error" onClick={onClose}>Delete</button> */}
              <Button variant="outlined" size="medium" startIcon={<ClearIcon />} onClick={onClose}>
                Close
              </Button>
              <Button color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>
                Delete
              </Button>

            </div>
     </div>
   </dialog>
    )}
    </>
    </div>
  )
}

export default ProductDelete
