import React from 'react'
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import LanguageIcon from '@mui/icons-material/Language';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const BrandView = ({title , children , isOpen , onClose , brandInfo}) => {
  console.log("brandInfo00000" , brandInfo)

  const customStyle = {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Custom shadow
  };
  return (
    <>
    {isOpen && (
        <dialog className='modal' open>
             <div className="modal-box w-11/12 max-w-3xl" style={customStyle}>
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="py-4">
              {/* {children} */}
              <div className='flex flex-row border p-4 m-4 rounded-lg shadow-md hover:bg-gray-100 transition-all'>
  <div className='flex-shrink-0'>
    <img
      src={brandInfo.logo}
      alt="Brand Logo"
      className='w-52 h-42 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105'
    />
  </div>
  <div className='flex flex-col justify-center items-start border-l border-gray-300 pl-4'>
    {/* Detail */}
    <div className='space-y-2'>
      <h2 className='font-semibold text-gray-800'>{brandInfo.name}</h2>
      <span className='text-xl font-semibold text-gray-800'>{brandInfo.description}</span>
      <p className='flex items-center text-gray-600'>
        <LanguageIcon className='mr-2' />
        <a href={brandInfo.website} target="_blank" rel="noopener noreferrer" className='hover:underline'>{brandInfo.website}</a>
      </p>
      <p className='flex items-center text-gray-600'>
        <PlaceOutlinedIcon className='mr-2' />
        {brandInfo.country}
      </p>
    </div>
  </div>
</div>



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

export default BrandView
