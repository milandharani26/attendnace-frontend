import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
  IconButton,
  Button,
  Popover,
  Typography,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeById } from '../../store/builders/employee/employee.builder';
import { deleteOfficeById } from '../../store/builders/office/office.builder';
import { deleteAttendanceById } from '../../store/builders/attendance/attendance.builder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HistoryIcon from '@mui/icons-material/History';
import { checkPermission } from '../../utility/genricFunctions';
import { useAppDispatch } from '../../store/store';

interface Data {
  id: number;
  [key: string]: any;
}

interface Column {
  id: keyof Data;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

interface CustomTableProps {
  data: Data[];
  columns: Column[];
  baseUrl: string
  tableName?: string
}

const CustomTable: React.FC<CustomTableProps> = ({ data, columns, baseUrl, tableName }) => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const useRole = useSelector(store => store?.auth?.user?.userRole?.role_name)
  const officeId = useSelector(store => store?.auth?.user?.user?.office_id)
  const orgId = useSelector(store => store?.auth?.user?.user?.org_id)


  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    columnId: keyof Data
  ) => {
    setFilters({
      ...filters,
      [columnId]: event.target.value,
    });
    setPage(0);
  };

  const filteredData = data.filter((row) =>
    columns.every((column) => {
      const filterValue = filters[column.id];
      if (!filterValue) return true;
      const cellValue = String(row[column.id]).toLowerCase();
      return cellValue.includes(filterValue.toLowerCase());
    })
  );

  const sortedData = filteredData?.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleEdit = (id: string) => {
    navigate(`${baseUrl}/${id}`);
  };

  const handleDelete = (id: string) => {
    // navigate(`${baseUrl}/${id}`);
    switch (tableName) {
      case "employee":
        dispatch(deleteEmployeeById({ id, orgId, officeId }))
        break;
      case "office":
        dispatch(deleteOfficeById(id))
        break;
      case "attendance":
        dispatch(deleteAttendanceById(id))
        break;

      default:
        break;
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [roleId, setroleId] = useState("")

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id) => {
    setAnchorEl(event.currentTarget);
    setroleId(id)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleEmployeeHistory = (id: string) => {
    navigate(`/employee/attendance-history/${id}`)
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {column.label}
                    {column.sortable && (
                      <IconButton
                        onClick={() => handleRequestSort(column.id)}
                        size="small"
                        aria-label={`Sort ${column.label}`}
                      >
                        {orderBy === column.id ? (
                          order === 'asc' ? (
                            <ArrowUpward fontSize="small" color="primary" />
                          ) : (
                            <ArrowDownward fontSize="small" color="primary" />
                          )
                        ) : (
                          <ArrowUpward fontSize="small" color="disabled" />
                        )}
                      </IconButton>
                    )}
                  </div>
                  {column.filterable && (
                    <TextField
                      variant="outlined"
                      // placeholder={`Filter ${column.label}`}
                      placeholder={`${column.label}`}
                      value={filters[column.id] || ''}
                      onChange={(e) => handleFilterChange(e, column.id)}
                      size="small"
                      fullWidth
                      style={{ marginTop: '8px' }}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}

          {/* <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'action' ? (
                        <IconButton
                          onClick={() => handleEdit(row.id)} // Trigger your edit function with the row id
                          aria-label="Edit"
                        >
                          <EditIcon />
                        </IconButton>
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'action' ? (
                        <>

                          <Button aria-describedby={id} variant="outlined" onClick={(e) => handleClick(e, row.id)} sx={{ border: "1px solid black" }}>
                            <MoreHorizIcon sx={{ color: "black" }} />
                          </Button>

                          {/* <IconButton onClick={() => handleEdit(row.id)} aria-label="edit">
                            <EditIcon fontSize="small" />
                          </IconButton>

                          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                            <DeleteIcon fontSize="small" />
                          </IconButton> */}
                        </>
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))


            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {
            open && <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >

              <Typography sx={{ p: 2 }}>
                {checkPermission(['orgadmin', 'officeadmin', 'superadmin'], useRole) &&
                  <>
                    <IconButton onClick={() => handleEdit(roleId)} aria-label="edit" sx={{ display: "flex", gap: "20px" }}>
                      <EditIcon fontSize="small" /> <Typography variant="body1">Edit</Typography>
                    </IconButton>

                    <IconButton onClick={() => handleDelete(roleId)} aria-label="delete" sx={{ display: "flex", gap: "20px" }}>
                      <DeleteIcon fontSize="small" />   <Typography variant="body1">Delete</Typography>
                    </IconButton>

                  </>
                }

                {tableName == "employee" && <>
                  <IconButton onClick={() => handleEmployeeHistory(roleId)} aria-label="delete" sx={{ display: "flex", gap: "20px" }}>
                    <HistoryIcon fontSize="small" />   <Typography>History</Typography>
                  </IconButton>
                </>}

              </Typography>
            </Popover>
          }

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper >
  );
};

export default CustomTable;
