import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { descendingComparator, getComparator, stableSort } from "./SortFunctions";
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const defaultRowsPerPage = 10;

export default function EnhancedTable(props) {
    const {
        headCells, rows: rowsRaw,
        deleteItems, title,
    } = props;

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
    const [filters, setFilters] = React.useState();

    // stick the rows with a permanent index
    const unfilteredRows = [...rowsRaw].map((rawRow, index) => ({ ...rawRow }));
    // filter the rows based on set filters
    const rows = unfilteredRows.filter(row => {
        for (const [key, value] of Object.entries(filters)) {
            // console.log(`${key}: ${value}`);
          }
        return true;
    });
    console.log("EnhancedTable rows/filtered rows:");
    console.log(unfilteredRows);
    console.log(rows);

    // sorting stuff
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    // select/delete stuff
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.id);
        setSelected(newSelecteds);
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
          selected.slice(selectedIndex + 1),
        );
      }

      setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // handle misc stuff
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

    const onDelete = (e) => {
        console.log(`onDelete, selected:`);
        console.log(selected);
        deleteItems(selected);
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const GenerateDataRow = (row, rowIndex) => (
        <>
            {headCells.map((headCell, index) => (
                index === 0 ? (
                    <TableCell
                        component="th"
                        id={`enhanced-table-checkbox-${index}`}
                        scope="row"
                        padding="none"
                    >
                        {row[headCell.id]}
                    </TableCell>
                ) :
                (
                    <TableCell>{row[headCell.id]}</TableCell>
                )
            ))}
        </>
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onDelete={(e) => onDelete(e)}
                    title={title}
                />
                <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headCells={headCells}
                    />
                    <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                        rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.name}
                                selected={isItemSelected}
                            >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                }}
                                />
                            </TableCell>
                            {GenerateDataRow(row, index)}
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
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
    );
}