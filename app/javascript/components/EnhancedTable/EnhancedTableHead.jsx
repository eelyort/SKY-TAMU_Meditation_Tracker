import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { visuallyHidden } from '@mui/utils';

export default function EnhancedTableHead(props) {
    const {
        onSelectAllClick, order, orderBy,
        numSelected, rowCount, onRequestSort,
        headCells, filters, setFilters, rows,
    } = props;
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
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
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
        {/* search/filters */}
        {(filters && setFilters) ? (
          <TableRow>
            <TableCell padding="checkbox">
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id + " filter"}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
              >
                <Autocomplete
                  disablePortal
                  options={rows.map(row => row[headCell.id]).filter((val, index, self) => self.indexOf(val) === index).map(val => ({ label: val }))}
                  value={filters[headCell.id] ?? null}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Filter ${headCell.label}`}
                      margin={'none'}
                      size={'small'}
                      style={{max: '200px'}}
                    />
                  )}
                  onChange={(e, newValue) => setFilters(oldFilters => {
                    let ans = {...oldFilters};
                    ans[headCell.id] = newValue?.label ?? null;
                    // console.log(`setFilters, e.target.value: ${e.target.value}, newValue.label: ${newValue?.label}`);
                    // console.log(ans);
                    return ans;
                  })}
                />
              </TableCell>
            ))}
          </TableRow>
        ) : (null)}
      </TableHead>
    );
}
