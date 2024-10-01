import React from 'react'
import TableRow  from '@mui/material/TableRow';
import TableCell  from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead'

import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

const BrandTableHead = (props) => {
    const headCells = [
        { id: 1, numeric: false, disablePadding: true, label: 'Logo' },
        { id: 2, numeric: true, disablePadding: false, label: 'Name' },
        { id: 3, numeric: true, disablePadding: false, label: 'Country' },
        { id: 4, numeric: true, disablePadding: false, label: 'Action' },
      ];

      const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
      const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };

      return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{ textAlign: 'center' }}
                >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                
                  {headCell.label}
                
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>

                
                
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
}

export default BrandTableHead
