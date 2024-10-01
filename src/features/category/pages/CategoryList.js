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
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useParams } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';

import TitleCard from '../../../components/Cards/TitleCard';
import CategoryTableHead from '../components/CategoryTableHead';
import CategoryView from "./CategoryView"
import CategoryDelete from './CategoryDelete';
import { getByIDCategory } from '../categoryAction';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
   
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            Available Category
          </Typography>
        )}
  
  
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
       
        ) : (
          <div className=' flex gap-3 justify-evenly items-center mr-[2rem]'>
          <Button color="success" variant="contained" endIcon={<AddIcon />} >
            <Link to="/app/category-create">Add</Link>
          </Button>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
  
          </div>
        )}
      </Toolbar>
    );
  }



const CategoryList = (props) => {

const dispatch = useDispatch();
const navigate = useNavigate();
const categoryList = props.categoryLists
// console.log(brandLists.length , "lengh")
const {userToken} = useSelector(state => state.auth)
const {categoryInfo} = useSelector(state => state.category)


const [order, setOrder] = useState('asc');
const [orderBy, setOrderBy] = useState('calories');
const [selected, setSelected] = useState([]);
const [page, setPage] = useState(0);
const [dense, setDense] = useState(false);
const [rowsPerPage, setRowsPerPage] = useState(10);




//view
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

// Handle opening and closing for each modal
const handleViewClick = (id) => {
  dispatch(getByIDCategory({categoryId : id , token : userToken}))
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

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelected = categoryList.map((n) => n._id);
    setSelected(newSelected);
    return;
  }
  setSelected([]);
};

const handleClick = (event, id) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }
  setSelected(newSelected);
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
//edit button

const handleClickEditForm = (id) => {
  navigate(`/app/category-edit/${id}`, { 
    state: {
      categoryId: id,
      token: userToken
    }
  });
}

const isSelected = (id) => selected.indexOf(id) !== -1;

const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoryList.length) : 0;

const visibleRows = React.useMemo(
  () => categoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  [order, orderBy, page, rowsPerPage]
);



return (
<>
  <TitleCard title="Category Lists" topMargin="mt-2">

  <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
          <CategoryTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={categoryList.length}

          />
       <TableBody>
{visibleRows.map((row, index) => {
  // console.log(row , "row")
  const isItemSelected = isSelected(row._id);
  const labelId = `enhanced-table-checkbox-${index}`;

  // Handle row click
  const handleRowClick = (event) => {
    // Prevent selection when clicking anywhere in the row except the checkbox
    if (event.target.type !== 'checkbox') {
      event.stopPropagation();
    }
  };

  return (
    <TableRow
      hover
      onClick={handleRowClick} // Apply the click handler to row
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row._id}
      selected={isItemSelected}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          onChange={(event) => handleClick(event, row._id)} // Handle checkbox click
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </TableCell>
      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
        {row.description}
      </TableCell>
      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
        <ul style={{ listStyleType: 'disc',display:'flex', justifyContent: 'center', paddingRight: '10px', gap: '10px', marginTop: '10px' }}>
          {row.brands.map((brand) => (<>
         <span class="badge whitespace-nowrap mb-2 inline-block text-sm bg-green-50 
         hover:bg-green-100 text-green-900 border border-green-100 py-3 px-3 rounded-md
         transition-all flex items-center justify-center">
         {brand.name}
        </span> 
          </>
          ))}
        </ul>
      </TableCell>

      {/* Action buttons */}
      <TableCell>
      <div className='flex justify-center items-center'>

    {/*view details */}
        <Button
          color="success"
          onClick={() => handleViewClick(row._id)}>
             <VisibilityIcon /> 
        </Button> 
        <CategoryView
        categoryInfo = {categoryInfo}
        title="Category Details!"
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        >
        <p>Click the button below to close.</p>
        </CategoryView>

        <Button  color="primary" onClick={() => handleClickEditForm(row._id)}> 
          {/* <Link to='/app/brand-edit'>
          </Link> */}
             <EditIcon />
        </Button> 


        <Button
          color="error"
          onClick={handleDeleteClick}>
        <DeleteIcon />
        </Button>
        <CategoryDelete
        id = {row._id}
        userToken = {userToken}
        title = "Delete Category"
        isOpen ={isDeleteModalOpen}
        onClose ={handleCloseDeleteModal}
        >
        <p>Click the button below to delete or cancel.</p> 
        </CategoryDelete>
        </div>
      </TableCell>
    

    </TableRow>
  );
})}
{emptyRows > 0 && (
  <TableRow
    style={{
      height: (dense ? 33 : 53) * emptyRows,
    }}
  >
    <TableCell colSpan={6} />
  </TableRow>
)}
</TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={categoryList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <FormControlLabel
      control={<Switch checked={dense} onChange={handleChangeDense} />}
      label="Dense padding"
    />
  </Box>

  </TitleCard>
  </>
)
};

export default CategoryList