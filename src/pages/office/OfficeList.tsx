import React, { useEffect } from 'react'
import "./officeList.scss"
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import BreadCrumbs from '../../components/breadCrumb/BreadCrumb';
import ButtonCustom from '../../components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOffices } from '../../store/builders/office/office.builder';
import CustomTable from '../../components/table/CustomTable';
import { checkPermission } from '../../utility/genricFunctions';
import { useAppDispatch } from '../../store/store';


const breadCrumbsArr = [
  {
    title: "Office List",
    link: null,
  },
  {
    title: "Dashboard",
    link: "/employee",
  },
  {
    title: "Office",
    link: null,
  },
];

const OfficeList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const officeTableData = useSelector((store) => store?.office?.officeTableData)
  const useRole = useSelector(store => store?.auth?.user?.userRole?.role_name)
  const orgId = useSelector(store => store?.auth?.user?.user?.org_id)

  const handleEdit = (rowData) => {
    navigate(`/edit-office/${rowData.id}`);
  };

  const columns = [
    { id: 'office_name', label: 'Office name', sortable: true, filterable: true },
    { id: 'office_location', label: 'Location', sortable: true, filterable: true },
    { id: 'office_email', label: 'Email', sortable: true, filterable: true },
    { id: 'action', label: 'Action', sortable: false, filterable: false },
  ];

  useEffect(() => {
    dispatch(getAllOffices(orgId))
  }, [])


  const handleAddEmployee = () => {
    navigate('add-office')
  }



  return (
    <Box className="officeList-container">
      <Box className="officeList-header">
        <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
        {checkPermission(['orgadmin'], useRole) && <ButtonCustom onClick={handleAddEmployee}>Add Office</ButtonCustom>}

      </Box>

      <Box className="officeList-table-wrapper">

        <Typography variant="h5">
          Office List
        </Typography>

        <CustomTable data={officeTableData ?? []} columns={columns} baseUrl='add-office' tableName='office' />
      </Box>

    </Box>
  );
}

export default OfficeList



