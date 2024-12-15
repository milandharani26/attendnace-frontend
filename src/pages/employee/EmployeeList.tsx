import "./employeeList.scss";
import React, { useEffect } from "react";
import BreadCrumbs from "../../components/breadCrumb/BreadCrumb";
import { Box, Typography } from "@mui/material";
import ButtonCustom from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees, getEmployee } from "../../store/builders/employee/employee.builder";
import { checkPermission } from "../../utility/genricFunctions";
import { useAppDispatch } from "../../store/store";

const breadCrumbsArr = [
  {
    title: "EmployeeList",
    link: '/employee',
  },
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "EmployeeList",
    link: null,
  },
];

// Define columns for the CommonTable
const columns = [
  { id: 'userName', label: 'Name', sortable: true, filterable: true },
  { id: 'userEmail', label: 'Email', sortable: true, filterable: true },
  { id: 'empDepartment', label: 'Department', sortable: true, filterable: true },
  { id: 'empDesignation', label: 'Designation', sortable: true, filterable: true },
  { id: 'action', label: 'Action', sortable: false, filterable: false },
];

const EmployeeList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const employeeTableData = useSelector(store => store?.employee?.employeeTableData)
  const useRole = useSelector(store => store?.auth?.user?.userRole?.role_name)
  const orgId = useSelector(store => store?.auth?.user?.user?.org_id)
  const officeId = useSelector(store => store?.auth?.user?.user?.office_id)

  const empId = useSelector(store => store?.auth?.user?.employee?.emp_id)

  useEffect(() => {
    if (useRole == 'employee') {
      dispatch(getEmployee(empId))
    } else {
      dispatch(getAllEmployees({ orgId, officeId }))
    }
  }, [])


  const handleAddEmployee = () => {
    navigate('add-employee')
  }

  return (
    <Box className="employeeList-container">

      <Box className="employeeList-header">
        <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
        {checkPermission(['orgadmin', 'officeadmin'], useRole) && <ButtonCustom onClick={handleAddEmployee}>Add Employee</ButtonCustom>}
      </Box>

      <Box className="employeeList-table-wrapper">
        <Typography variant="h5">
          Employee List
        </Typography>

        <CustomTable data={employeeTableData ?? []} columns={columns} baseUrl="add-employee" tableName="employee" />
      </Box>

    </Box>
  );
};

export default EmployeeList;
