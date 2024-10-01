import React from 'react'
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { Hiking, NineKRounded } from '@mui/icons-material';

const CategoryView = ({title , children , isOpen , onClose , categoryInfo}) => {

    const customStyle = {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Custom shadow
      }
  return (
    <>
    {isOpen && (
        <dialog className='modal' open>
             <div className="modal-box w-11/12 max-w-3xl" style={customStyle}>
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="py-4">
              {/* {children} */}
              <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {categoryInfo.name} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            {categoryInfo.description}
          </Typography>
        </CardContent>



            </div>
            <div className="modal-action">
              {/* <button className="btn" onClick={onClose}>Close</button> */}
              <Button variant="outlined" size="medium" startIcon={<ClearIcon />} onClick={onClose}>
                    Close
              </Button>
            </div>
          </div>
        </dialog>
    )}
    </>
  )
}

export default CategoryView
