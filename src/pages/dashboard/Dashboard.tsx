import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import "./dashboard.scss"
import CustomTable from '../../components/table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance, getTodayAttendanceCount } from '../../store/builders/attendance/attendance.builder';
import DCard from '../../components/dashboard-card/Card';
import { getAllEmployeesCount } from '../../store/builders/employee/employee.builder';

const Dashboard = () => {
  const dispatch = useDispatch()
  const attendanceTableData = useSelector(store => store?.attendance?.attendanceTableData)
  const todaysAttendanceCount = useSelector(store => store?.attendance?.todayAttendanceCount)
  const allEmployeesCount = useSelector(store => store?.employee?.allEmployeeCount)
  const orgId = useSelector(store => store?.auth?.user?.user?.org_id)

  useEffect(() => {
    dispatch(getAllAttendance())
    dispatch(getTodayAttendanceCount())
    dispatch(getAllEmployeesCount({ orgId }))
  }, [])


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
    // { id: 'action', label: 'Action', sortable: false, filterable: false },
  ];

  return (
    <Box className="dashboard-container-wrapper">

      <Box className="dashboard-card-wrapper">
        <DCard title="Total Employees" value={allEmployeesCount ?? "-"} growth={2.5} progress={75} />
        <DCard title="Today Attendance" value={todaysAttendanceCount ?? "-"} growth={-1.2} progress={53} />
      </Box>

      <Box className="dashboard-table-wrapper">
        <Typography variant="h5">
          Today's Attendance List
        </Typography>
        <CustomTable data={attendanceTableData ?? []} columns={columns} baseUrl='attendance' />
      </Box>

    </Box>
  )
}

export default Dashboard
