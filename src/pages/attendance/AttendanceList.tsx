import React, { useEffect } from 'react'
import "./attendanceList.scss"
import { Box, Typography } from '@mui/material';
import BreadCrumbs from '../../components/breadCrumb/BreadCrumb';
import CustomTable from '../../components/table/CustomTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance } from '../../store/builders/attendance/attendance.builder';

const breadCrumbsArr = [
  {
    title: "Attendance List",
    link: null,
  },
  {
    title: "Dashboard",
    link: "/employee",
  },
  {
    title: "Attendance",
    link: null,
  },
];

const data = [
  { id: 1, name: 'Alice', age: 30, city: "Ahmedabad" },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 28 },
  { id: 5, name: 'Eve', age: 32 },
  { id: 6, name: 'Frank', age: 27 },
  { id: 7, name: 'Grace', age: 33 },
  { id: 8, name: 'Hannah', age: 29 },
  { id: 9, name: 'Isaac', age: 34 },
  { id: 10, name: 'Jack', age: 31 },
  { id: 11, name: 'Karen', age: 26 },
  { id: 12, name: 'Leo', age: 36 },
  { id: 13, name: 'Mona', age: 30 },
  { id: 14, name: 'Nina', age: 28 },
  { id: 15, name: 'Oscar', age: 35 },
  { id: 16, name: 'Paul', age: 27 },
  { id: 17, name: 'Quincy', age: 32 },
  { id: 18, name: 'Rachel', age: 29 },
  { id: 19, name: 'Sam', age: 31 },
  { id: 20, name: 'Tina', age: 33 },
  { id: 21, name: 'Uma', age: 25 },
  { id: 22, name: 'Vera', age: 34 },
  { id: 23, name: 'Will', age: 28 },
  { id: 24, name: 'Xena', age: 32 },
  { id: 25, name: 'Yara', age: 27 },
  { id: 26, name: 'Zane', age: 29 },
  { id: 27, name: 'Amy', age: 26 },
  { id: 28, name: 'Ben', age: 35 },
  { id: 29, name: 'Cara', age: 30 },
  { id: 30, name: 'Dean', age: 31 },
  { id: 31, name: 'Elle', age: 28 },
  { id: 32, name: 'Finn', age: 34 },
  { id: 33, name: 'Gina', age: 25 },
  { id: 34, name: 'Hugo', age: 33 },
  { id: 35, name: 'Ivy', age: 32 },
  { id: 36, name: 'John', age: 29 },
  { id: 37, name: 'Kara', age: 31 },
  { id: 38, name: 'Liam', age: 27 },
  { id: 39, name: 'Mia', age: 34 },
  { id: 40, name: 'Noah', age: 30 },
  { id: 41, name: 'Olivia', age: 28 },
  { id: 42, name: 'Peter', age: 33 },
  { id: 43, name: 'Quinn', age: 29 },
  { id: 44, name: 'Ruby', age: 31 },
  { id: 45, name: 'Steve', age: 25 },
  { id: 46, name: 'Tara', age: 32 },
  { id: 47, name: 'Ulysses', age: 28 },
  { id: 48, name: 'Vince', age: 34 },
  { id: 49, name: 'Wendy', age: 27 },
  { id: 50, name: 'Xander', age: 30 },
  { id: 51, name: 'Yvonne', age: 29 },
  { id: 52, name: 'Zara', age: 33 },
  { id: 53, name: 'Adam', age: 26 },
  { id: 54, name: 'Beth', age: 31 },
  { id: 55, name: 'Carl', age: 28 }
]

const AttendanceList = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const attendanceTableData = useSelector(store => store?.attendance?.attendanceTableData)


  const columns = [
    // { id: 'id', label: 'Name', sortable: true, filterable: true },
    // { id: 'id', label: 'Emp id', sortable: false, filterable: true },
    { id: 'userName', label: 'Employee name', sortable: true, filterable: true },
    { id: 'userEmail', label: 'Employee Email', sortable: true, filterable: true },
    { id: 'empDesignation', label: 'Employee Designation', sortable: true, filterable: true },
    { id: 'empDepartment', label: 'Employee Department', sortable: true, filterable: true },
    // { id: 'attendanceDate', label: 'Attendance date', sortable: false, filterable: true },
    { id: 'entryTime', label: 'Entry time', sortable: true, filterable: true },
    { id: 'exitTime', label: 'Exit time', sortable: true, filterable: true },
    { id: 'action', label: 'Action', sortable: false, filterable: false },
  ];

  useEffect(() => {
    dispatch(getAllAttendance())
  }, [])

  return (
    <Box className="attendanceList-container">
      <Box className="attendanceList-header">
        <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
        {/* <ButtonCustom onClick={handleAddEmployee}>Add Employee</ButtonCustom> */}
      </Box>

      <Box className="attendanceList-table-wrapper">
        <Typography variant="h5">
          Attendance List
        </Typography>

        <CustomTable data={attendanceTableData ?? []} columns={columns} baseUrl="add-attendance" tableName="attendance" />
      </Box>
    </Box>
  );
}

export default AttendanceList
