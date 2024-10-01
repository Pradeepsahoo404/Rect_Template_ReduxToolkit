import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button  from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../components/Cards/TitleCard';
import { getAllProduct , getByIdProduct , deleteProduct} from '../productAction';
import ProductDelete from "../pages/ProductDelete.js"
// import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productLists = props.ProductLists;
  const {userToken} = useSelector(state => state.auth)
  const {loading , message , success} = useSelector((state) => state.product)

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

console.log("productLists" , productLists , userToken)

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Handle opening and closing for each modal
  const handleViewClick = (id) => {
    // dispatch(getByIDSubCategory({subCategoryId : id , token : userToken}))
    setIsViewModalOpen(true); 
  }
  
  const handleDeleteClick = () =>{
    setIsDeleteModalOpen(true);
  }
  
  const handleCloseViewModal = () => setIsViewModalOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


const handleClickEditForm = (id) => {
  navigate(`/app/subcategory-edit/${id}`, { 
    state: {
      subCategoryId: id,
      token: userToken
    }
  });
}

const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productLists.length) : 0;

const visibleRows = React.useMemo(
  () => productLists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  [order, orderBy, page, rowsPerPage]
);

return (
  <>
    <TitleCard title="Product List" topMargin="mt-2">
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-8 mt-10 mb-5">
        {productLists.map((product, index) => (
          <div key={index} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <Link to={`/app/product-view/${product._id}`}>
              <img 
                src={product.imageUrl || "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} 
                alt={product.name || "Product"} 
                className="h-72 w-72 object-cover rounded-t-xl" 
              />
           </Link> 
              <div className="px-4 py-3">
                <span className="text-gray-400 mr-3 uppercase text-xs">{product.brand[0]?.name || "Brand"}</span>
                <div className='flex justify-around gap-x-20'>
                  <p className="text-lg font-bold text-black truncate block capitalize">{product.name || "Product Name"}</p>
                  <span className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <svg
                        key={i}
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    ))}
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </span>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">₹{product.price.org || "149"}</p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">₹{product.price.mrp || "199"}</p>
                  </del>
                  <div className="ml-auto">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents click from propagating to Link
                        handleDeleteClick(product);
                      }} 
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      Remove
                    </button>
                    <ProductDelete
                      id={product._id}
                      userToken={userToken}
                      title="Delete Product"
                      isOpen={isDeleteModalOpen}
                      onClose={handleCloseDeleteModal}
                    >
                      <p>Click the button below to delete or cancel.</p> 
                    </ProductDelete>
                  </div>
                </div>
              </div>
            
          </div>
        ))}
      </section>
    </TitleCard>
  </>
)
}

export default ProductList;