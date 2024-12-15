import React, { useEffect, useState } from "react";
import "./addEmployeeFrom.scss";
import { Box, Typography } from "@mui/material";
import BreadCrumbs from "../../components/breadCrumb/BreadCrumb";
import ButtonCustom from "../../components/button/Button";
import Input from "../../components/input/Input";
import { Formik } from "formik";
import { employeeValidationSchema } from "../../utility/helper";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, getEmployeeById, updateEmployeeById } from "../../store/builders/employee/employee.builder";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateToYYYYMMDD } from "../../utility/genricFunctions";
import { useAppDispatch } from "../../store/store";

const breadCrumbsArr = [
  {
    title: "Employee Form",
    link: null,
  },
  {
    title: "Dashboard",
    link: "/employee",
  },
  {
    title: "EmployeeList",
    link: "/employee",
  },
  {
    title: "EmployeeForm",
    link: null,
  },
];

const AddEmployeeForm = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const emptableData = useSelector((store) => store?.employee?.formEditId)
  const orgId = useSelector(store => store?.auth?.user?.user?.org_id)
  const officeIdForNewEmployee = useSelector(store => store?.auth?.user?.user?.office_id)
  const { id } = useParams()

  const [editEmployeeData] = emptableData ? emptableData : []

  const userId = editEmployeeData?.userId
  const officeId = id ? editEmployeeData?.officeId : officeIdForNewEmployee

  console.log(officeId, "000000000000")

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    birthday: "",
    department: "",
    designation: "",
    employeeImage: "",
    faceEncodings: "",
  });

  useEffect(() => {
    if (id) {
      //dispatch for edit or update
      // dispatch(editOfficeById(id))

      dispatch(getEmployeeById(id))


    }
  }, [])


  useEffect(() => {
    if (id) {
      setInitialValues({
        name: editEmployeeData?.userName ?? "",
        email: editEmployeeData?.userEmail ?? "",
        password: editEmployeeData?.userPassword ?? "",
        age: editEmployeeData?.userAge ?? "",
        birthday: editEmployeeData?.userBirthday ? formatDateToYYYYMMDD(editEmployeeData.userBirthday) : "",
        department: editEmployeeData?.empDepartment ?? "",
        designation: editEmployeeData?.empDesignation ?? "",
        employeeImage: "",
        faceEncodings: editEmployeeData?.empEncodedImage ?? ""
      })
    }
  }, [editEmployeeData])


  const handleSubmit = (values: object) => {
    if (id) {
      dispatch(updateEmployeeById({ values, userId, empId: id, officeId, navigate, orgId }))
    } else {
      dispatch(createEmployee({ values, navigate, officeId, orgId }))
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={employeeValidationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <Box className="employeeForm-container-wrapper">
          <Box className="employeeForm-header">
            <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
            <ButtonCustom onClick={handleSubmit}> Save</ButtonCustom>
          </Box>

          <Box className="employeeForm-outer-wrapper">
            <Box>
              <Typography variant="h6" style={{ marginBottom: "20px" }}>
                {id ? "Update" : "Add"} new employee
              </Typography>
            </Box>

            <Box className="employeeForm-wrapper">
              <Input
                label="Name"
                placeholder="Enter name"
                name="name"
                width="32%"
                required={true}
              // onInput={handleName}
              />
              <Input
                label="Email"
                placeholder="Enter Email"
                name="email"
                width="32%"
                required={true}
              // onInput={handleName}
              />
              <Input
                label="Password"
                placeholder="Enter password"
                name="password"
                width="32%"
                type="password"
                required={true}
              // onInput={handleName}
              />
              <Input
                label="age"
                placeholder="Enter age"
                name="age"
                width="32%"
                type="number"
                required={true}
              // onInput={handleName}
              />

              <Input
                label="Birthday"
                placeholder="Enter birthday"
                name="birthday"
                width="32%"
                type="date"
                required={true}
              // onInput={handleName}
              />

              <Input
                label="Department"
                placeholder="Enter department"
                name="department"
                width="32%"
                required={true}
              // onInput={handleName}
              />

              <Input
                label="Designation"
                placeholder="Enter designation"
                name="designation"
                width="32%"
                required={true}
              // onInput={handleName}
              />

              <Input
                label="image"
                placeholder="Enter image"
                name="employeeImage"
                width="32%"
                type="file"
                required={true}
              // onInput={handleName}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default AddEmployeeForm;
