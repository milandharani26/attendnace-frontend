import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import apiClient from '../../../services/axios';

interface createEmployee {
    values: {
        name: string,
        email: string,
        password: string,
        age: string,
        birthday: Date,
        department: string,
        designation: string,
        employeeImage: string
    },
    officeId: string
    orgId: string
    navigate: (path: string) => void;
}

interface updateEmployeeById {
    values: {
        department: string,
        designation: string,
        faceEncodings: string,
        name: string,
        email: string,
        password: string,
        birthday: string,
        age: string
    },
    orgId: string
    userId: string,
    empId: string,
    officeId: string,
    navigate: (path: string) => void;
}

interface createEmployeeResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any; // Define the shape of your response data if you have a specific type
    status: number;
}

const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'post',
};

export const createEmployee = createAsyncThunk('employee/addEmployee', async ({ values, orgId, navigate, officeId }: createEmployee) => {
    const { name, email, password, age, birthday, department, designation } = values

    //here send employeeImage to lambda function and have that image encoding and than we send to backend 

    const employeeData = {
        office_id: officeId,
        emp_department: department,
        emp_designation: designation,
        org_id: orgId,
        emp_encoded_image: '[0.052291687577962875, -0.08443202078342438, 0.10563474893569946, 0.06592658907175064]',
        user_name: name,
        user_email: email,
        user_password: password,
        user_birthday: birthday,
        user_age: age
    }

    try {
        const response: createEmployeeResponse = await apiClient.post(
            'employee',
            employeeData,
            config
        );

        if (response.status) {
            navigate('/employee')
            toast.success("Successfully added Employee", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }


        // return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }


})


interface getAllEmployeesProps {
    orgId?: string,
    officeId?: string
}




interface CustomError extends Error {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export const getAllEmployees = createAsyncThunk(
    'employee/getEmployees',
    async ({ orgId, officeId }: getAllEmployeesProps) => {
        try {
            // Build query string conditionally
            let query = '';
            if (orgId && officeId) {
                query = `?org_id=${orgId}&office_id=${officeId}`;
            } else if (orgId) {
                query = `?org_id=${orgId}`;
            } else if (officeId) {
                query = `?office_id=${officeId}`;
            }

            // Send request with dynamic query string
            const response = await apiClient.get(`employee/filter${query}`);

            if (response.status) {
                toast.success("Successfully retrieved all employees", {
                    className: 'custom-toast-success',
                    progressStyle: { background: '#ffffff' },
                });
            }

            const updatedOffices = response?.data?.data.map((employee: { empId: string }) => ({
                id: employee.empId,
                ...employee,
            }));

            return updatedOffices;
        } catch (error: unknown) {
            const typedError = error as CustomError;
            const errorMessage = typedError?.response?.data?.message || 'An error occurred';
            toast.error(errorMessage, {
                className: 'custom-toast-error',
                progressStyle: { background: '#C53C43' },
            });
            throw error; // Ensure error is thrown to handle in the builder or calling code
        }
    }
);



export const getEmployeeById = createAsyncThunk('employee/getEmployeesById', async (id: string) => {

    try {
        const response = await apiClient.get(`employee/filter?emp_id=${id}`);

        if (response.status) {
            toast.success("Successfully get Employee", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        const updatedOffices = response?.data?.data.map((employee: { empId: string }) => ({ id: employee.empId, ...employee }))

        return updatedOffices;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }


})


export const updateEmployeeById = createAsyncThunk('employee/updateEmployee', async ({ values, userId, empId, officeId, navigate, orgId }: updateEmployeeById) => {

    const { department, designation, faceEncodings, name, email, password, birthday, age } = values

    const employeeData = {
        office_id: officeId,
        emp_department: department,
        emp_designation: designation,
        emp_encoded_image: faceEncodings,
        org_id: orgId,
        user_name: name,
        user_email: email,
        user_password: password,
        user_birthday: birthday,
        user_age: age,
        user_id: userId
    }

    try {
        const response = await apiClient.put(`employee/${empId}`, employeeData, config);
        if (response.status) {
            toast.success("Successfully updated office", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        navigate('/employee')

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }

})

interface deleteEmployeeByIdProps {
    id: string,
    orgId: string,
    officeId: string
}


export const deleteEmployeeById = createAsyncThunk('employee/deleteEmployee', async ({ id, orgId, officeId }: deleteEmployeeByIdProps, { dispatch }) => {

    try {
        const response = await apiClient.delete(`employee/${id}`);
        if (response.status) {
            toast.success("Successfully deleted employee", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        dispatch(getAllEmployees({ orgId, officeId }))

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }

})


interface getEmployeeCount {
    orgId?: string
    officeId?: string
}


export const getAllEmployeesCount = createAsyncThunk('employee/getAllEmployeesCount', async ({ orgId }: getEmployeeCount) => {

    //  let query = `org_id=${orgId}&office_id=${officeId}`
    const query = `org_id=${orgId}`

    try {
        const response = await apiClient.get(`employee/count?${query}`);
        if (response.status) {
            toast.success("Successfully updated office", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        return response?.data?.count

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }

})


export const getEmployee = createAsyncThunk('employee/getEmployee', async (empId: string) => {

    // const empId = "1bd2bf21-6a57-457e-854c-5fd5e327459b"

    try {

        if (empId) {
            const response = await apiClient.get(`employee/filter?emp_id=${empId}`);

            if (response.status) {
                toast.success("Successfully get all Employees", {
                    className: 'custom-toast-success',
                    progressStyle: { background: '#ffffff' },
                })
            }

            const updatedOffices = response?.data?.data.map((employee: { empId: string }) => ({ id: employee.empId, ...employee }))

            return updatedOffices;
        }


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }


})