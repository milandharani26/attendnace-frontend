import React, { useEffect, useMemo, useState } from "react";
import "./addOfficeForm.scss";
import { Box, Typography } from "@mui/material";
import BreadCrumbs from "../../components/breadCrumb/BreadCrumb";
import ButtonCustom from "../../components/button/Button";
import Input from "../../components/input/Input";
import { Formik } from "formik";
import { officeValidationSchema } from "../../utility/helper";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOffice, editOfficeById, updateOfficeById } from "../../store/builders/office/office.builder";
import { formatDateToYYYYMMDD } from "../../utility/genricFunctions";

const breadCrumbsArr = [
  {
    title: "Office Form",
    link: null,
  },
  {
    title: "Dashboard",
    link: "/employee",
  },
  {
    title: "Office",
    link: "/office",
  },
  {
    title: "officeForm",
    link: null,
  },
];

const AddOfficeForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const editOfficeData = useSelector((store) => store?.office?.formEditId)
  const orgId = useSelector((store) => store?.auth?.user?.user?.org_id)


  const [initialValues, setInitialValues] = useState({
    officeName: "",
    officeLocation: "",
    officeEmail: "",
    userId: "",
    //this will me office admin
    userName: "",
    userEmail: "",
    password: "",
    birthday: "",
    age: "",
  });


  useEffect(() => {
    if (id) {
      //dispatch for edit or update
      dispatch(editOfficeById(id))
    }
  }, [])


  useEffect(() => {
    if (id) {
      setInitialValues({
        officeName: editOfficeData?.officeName ?? "",
        officeLocation: editOfficeData?.officeLocation ?? "",
        officeEmail: editOfficeData?.officeEmail ?? "",
        //this will me office admin
        userId: editOfficeData?.userId ?? "",
        userName: editOfficeData?.userName ?? "",
        userEmail: editOfficeData?.userEmail ?? "",
        password: editOfficeData?.userPassword ?? "",
        birthday: editOfficeData?.userBirthday ? formatDateToYYYYMMDD(editOfficeData.userBirthday) : "",
        age: editOfficeData?.userAge ?? "",
      })
    }
  }, [editOfficeData])

  const handleSubmit = (values: object) => {

    if (id) {
      dispatch(updateOfficeById({ values: { orgId, ...values }, officeId: id, navigate }))
    } else {
      dispatch(createOffice({ values: { orgId, ...values }, navigate }))
    }

  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={officeValidationSchema}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      enableReinitialize
    >
      {({ handleSubmit }) => (

        <Box className="officeForm-container-wrapper">
          <Box className="officeForm-header">
            <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
            <ButtonCustom onClick={handleSubmit}> Save</ButtonCustom>
          </Box>

          <Box className="officeForm-outer-wrapper">
            <Box>
              <Typography variant="h6" style={{ marginBottom: "20px" }}>
                Add new office
              </Typography>
            </Box>

            <Box className="officeForm-wrapper">
              <Input
                label="Office name"
                placeholder="Enter office name"
                name="officeName"
                width="32%"
                required={true}
              // onInput={handleName}
              />
              <Input
                label="Office location"
                placeholder="Enter office location"
                name="officeLocation"
                width="32%"
                required={true}
              // onInput={handleName}
              />
              <Input
                label="Office email"
                placeholder="Enter office email"
                name="officeEmail"
                width="32%"
                type="text"
                required={true}
              // onInput={handleName}
              />
              <Input
                label="Office Admin name"
                placeholder="Enter name"
                name="userName"
                width="32%"
                required={true}
              // onInput={handleName}
              />

              <Input
                label="Office Admin Email"
                placeholder="Enter Email"
                name="userEmail"
                width="32%"
                required={true}
              // onInput={handleName}
              />

              <Input
                label="password"
                placeholder="Enter password"
                name="password"
                width="32%"
                type="password"
                required={true}
              // onInput={handleName}
              />

              <Input
                label="birthday"
                placeholder="Enter birthday"
                name="birthday"
                width="32%"
                type="date"
                required={true}
              // onInput={handleName}
              />

              <Input
                label="age"
                placeholder="Enter age"
                name="age"
                width="32%"
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

export default AddOfficeForm;
