import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import apiClient from '../../../services/axios';


export const getAllPlans = createAsyncThunk('plan/getAllPlans', async () => {

    try {
        const response = await apiClient.get(`/plans`);
        if (response.status) {
            toast.success("Success all Employees", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }


        // return response.data.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }
})