import { Box, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../components/breadCrumb/BreadCrumb';
import ButtonCustom from '../../components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import './attendanceForm.scss'
import Input from '../../components/input/Input';
import { getAttendanceById, updateAttendanceById } from '../../store/builders/attendance/attendance.builder';
import { useAppDispatch } from '../../store/store';

const breadCrumbsArr = [
    {
        title: "Attendance Form",
        link: null,
    },
    {
        title: "Dashboard",
        link: "/dashboard",
    },
    {
        title: "AttendanceList",
        link: "/attendance",
    },
    {
        title: "Attendance form",
        link: null,
    },
];

interface attendanceDataObject {
    userName: string
    entryTime: string
    exitTime: string
}

const AttendanceForm = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const attendanceData: attendanceDataObject = useSelector((store: {
        attendance: {
            formEditId: string
        }
    }) => store?.attendance?.formEditId)

    const [initialValues, setInitialValues] = useState({
        name: "",
        entryTime: "",
        exitTime: ""
    });


    useEffect(() => {
        if (id) {
            //dispatch for edit or update
            // dispatch(editOfficeById(id))

            dispatch(getAttendanceById(id))
        }
    }, [])

    useEffect(() => {
        if (id) {
            setInitialValues({
                name: attendanceData?.userName ?? "",
                entryTime: attendanceData?.entryTime ?? "",
                exitTime: attendanceData?.exitTime ?? ""
            })
        }
    }, [attendanceData])

    const handleSubmit = (values: object) => {
        if (id) {
            dispatch(updateAttendanceById({ values, attendanceId: id, navigate }))
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={employeeValidationSchema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
            enableReinitialize
        >
            {({ handleSubmit }) => (
                <Box className="attendanceForm-container-wrapper">
                    <Box className="attendanceForm-header">
                        <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
                        <ButtonCustom onClick={handleSubmit}> Save</ButtonCustom>
                    </Box>

                    <Box className="attendanceForm-outer-wrapper">
                        <Box>
                            <Typography variant="h6" style={{ marginBottom: "20px" }}>
                                {id ? "Update" : "Add"} new attendance
                            </Typography>
                        </Box>

                        <Box className="attendanceForm-wrapper">
                            <Input
                                label="Name"
                                placeholder="Enter name"
                                name="name"
                                width="32%"
                                required={true}
                            // onInput={handleName}
                            />
                            <Input
                                label="Entry Time"
                                placeholder="Enter entry time"
                                name="entryTime"
                                width="32%"
                                required={true}
                                type='time'
                            // onInput={handleName}
                            />

                            <Input
                                label="Exit Time"
                                placeholder="Enter exit time"
                                name="exitTime"
                                width="32%"
                                required={true}
                                type='time'
                            // onInput={handleName}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </Formik>
    )
}

export default AttendanceForm
