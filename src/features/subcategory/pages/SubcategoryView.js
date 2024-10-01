import React from 'react'
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const SubcategoryView = ({title , children , isOpen , onClose , subCategoryInfo}) => {
    // console.log(title, children ,isOpen , onClose , subCategoryInfo )
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
              {subCategoryInfo?.name} 
              </Typography>
            

            

        <div className="flex items-center my-4">
              <p className="text-lg mr-2">Category:</p>
              <div className="flex flex-wrap gap-2">
              <span class="badge whitespace-nowrap mb-2 inline-block text-lg bg-green-50 
         hover:bg-green-100 text-green-900 border border-green-100 py-6 px-12 rounded-md
         transition-all flex items-center justify-center">
         {subCategoryInfo.category.name}
        </span>
              </div>
            </div> 
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                {subCategoryInfo.description}
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

export default SubcategoryView
