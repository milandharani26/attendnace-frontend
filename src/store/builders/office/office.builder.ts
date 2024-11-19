import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import apiClient from '../../../services/axios';



interface createOffice {
    values: {
        officeName: string,
        officeLocation: string,
        officeEmail: string,
        userName: string,
        userEmail: string,
        password: string,
        birthday: Date,
        age: string
        orgId: string
    },
    navigate: (path: string) => void;
}

interface updateOffice {
    values: {
        officeName: string,
        officeLocation: string,
        officeEmail: string,
        userName: string,
        userEmail: string,
        password: string,
        birthday: Date,
        age: string
        userId: string
        orgId: string
    },
    officeId: string,
    userId?: string
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


export const createOffice = createAsyncThunk('office/addOffice', async ({ values, navigate }: createOffice) => {

    const { officeName, officeLocation, officeEmail, userName, userEmail, password, birthday, age, orgId } = values

    const officeData = {
        office_name: officeName,
        office_location: officeLocation,
        office_email: officeEmail,
        // org_id: "1bd2bf21-6a57-457e-854c-5fd5e327459b",
        org_id: orgId,
        user_name: userName,
        user_email: userEmail,
        user_password: password,
        user_birthday: birthday,
        user_age: age
    }


    try {
        const response: createEmployeeResponse = await apiClient.post(
            'office',
            officeData,
            config
        );

        if (response.status) {
            navigate('/office')
            toast.success("Success full added office", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
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


export const getAllOffices = createAsyncThunk('office/getOffices', async (orgId: string) => {

    try {
        const response = await apiClient.get(`/office/same-orgs/${orgId}`);
        if (response.status) {
            toast.success("Success all Employees", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        const updatedOffices = response?.data?.data.map((office: {
            office_id: string
        }) => ({ id: office.office_id, ...office }));

        return updatedOffices;
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }
})


export const editOfficeById = createAsyncThunk('office/editOffice', async (officeId: string) => {

    const id = officeId

    try {
        const response = await apiClient.get(`office/${id}`);
        if (response.status) {
            toast.success("Success get office", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }


        return response.data.result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }
})

export const updateOfficeById = createAsyncThunk('office/updateOffice', async ({ values, officeId, navigate }: updateOffice) => {

    const { officeName, officeLocation, officeEmail, userName, userEmail, password, birthday, age, userId, orgId } = values


    const officeData = {
        office_name: officeName,
        office_location: officeLocation,
        office_email: officeEmail,
        // org_id: "1bd2bf21-6a57-457e-854c-5fd5e327459b",
        org_id: orgId,
        user_name: userName,
        user_email: userEmail,
        user_password: password,
        user_birthday: birthday,
        user_age: age,
        user_id: userId
    }

    const id = officeId

    try {
        const response = await apiClient.put(`office/${id}`, officeData, config);
        if (response.status) {
            toast.success("Success get office", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        navigate('/office')

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }
})




export const deleteOfficeById = createAsyncThunk('office/deleteOffice', async (id: string, { dispatch }) => {

    try {
        const response = await apiClient.delete(`office/${id}`);
        if (response.status) {
            toast.success("Successfully deleted office", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        dispatch(getAllOffices())

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }

})