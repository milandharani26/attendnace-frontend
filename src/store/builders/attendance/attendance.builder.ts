import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import apiClient from '../../../services/axios';
import { formatDateToYYYYMMDD, generateMonthDates } from '../../../utility/genricFunctions';
import { format, isBefore, isToday } from 'date-fns';

const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'post',
};

interface getAllAttendance {
    officeId: string,
    orgId: string,
    useRole: string
}

export const getAllAttendance = createAsyncThunk(
    'attendance/getAttendance',
    async ({ officeId, orgId, useRole }: getAllAttendance) => {
        try {
            // Build query parameters conditionally based on useRole
            const queryParams: Record<string, string> = {};
            if (useRole === 'orgadmin' && orgId) {
                queryParams.org_id = orgId;
            }
            if (officeId) {
                queryParams.office_id = officeId;
            }

            // Construct query string
            const queryString = new URLSearchParams(queryParams).toString();

            // Make the API call
            const response = await apiClient.get(`attendance?${queryString}`);

            // Handle success response
            if (response.status) {
                toast.success("Successfully fetched all Attendance", {
                    className: 'custom-toast-success',
                    progressStyle: { background: '#ffffff' },
                });
            }

            // Return the result data
            return response?.data?.result;
        } catch (error: any) {
            // Handle errors
            const errorMessage = error?.response?.data?.message || 'An error occurred';

            toast.error(errorMessage, {
                className: 'custom-toast-error',
                progressStyle: { background: '#C53C43' },
            });

            // Rethrow the error if needed
            throw error;
        }
    }
);


export const getTodayAttendanceCount = createAsyncThunk("attendance/getTodayAttendanceCount", async () => {
    try {

        const response = await apiClient.get(`attendance/count`);

        if (response.status) {
            toast.success("Success get employee count", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        return response?.data?.count;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }
})



export const deleteAttendanceById = createAsyncThunk('attendance/deleteAttendance', async (id, { dispatch }) => {

    try {
        const response = await apiClient.delete(`attendance/${id}`);
        if (response.status) {
            toast.success("Successfully deleted attendance", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        dispatch(getAllAttendance())

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }

})

interface getAttendanceHistory {
    id: string
    start: string
    end: string
}

interface getAttendanceHistoryData {
    empId: string
    start: string
    end: string
}

export const getAttendanceHistory = createAsyncThunk('attendance/getAttendanceHistory', async ({ id, start, end }: getAttendanceHistory) => {

    const attendanceHistoryData: getAttendanceHistoryData = {
        empId: id,
        //empId: "d38fef62-b0e8-46b0-95cd-e7cd4bea32ba"
        start: "2024-09-29",
        end: "2024-11-10"
    }


    try {
        const response = await apiClient.post(`attendance-history`, attendanceHistoryData);
        if (response.status) {
            toast.success("Successfully get attendance history", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        const modifiedHistoryData = response?.data?.result.map((attendance) => {
            return { ...attendance, date: formatDateToYYYYMMDD(attendance.date), }
        })

        // Array to store "present" dates
        const presentDatesArray = modifiedHistoryData
            .filter((record) => record.status.toLowerCase() === "present")
            .map((record) => format(new Date(record.date), "yyyy-MM-dd"));

        const today = new Date();
        const allDatesInMonth = generateMonthDates(start, end);

        // Convert attendance data into events, adding "Absent" status for past dates only
        const events = allDatesInMonth
            .filter((date) => isBefore(date, today) || isToday(date)) // Include only past and present dates
            .map((date) => {
                const dateStr = format(date, "yyyy-MM-dd");
                return {
                    title: presentDatesArray.includes(dateStr) ? "Present" : "Absent",
                    date: dateStr,
                    className: presentDatesArray.includes(dateStr) ? "present-day" : "absent-day",
                };
            });


        // return modifiedHistoryData;
        return events;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }
})



export const getAttendanceById = createAsyncThunk('attendance/getAttendanceById', async (id: string) => {

    try {
        const response = await apiClient.get(`attendance/${id}`);

        if (response.status) {
            toast.success("Successfully get attendance", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        return response?.data?.result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }
})

interface updateAttendanceById {
    values: {
        name?: string
        entryTime: string,
        exitTime: string
    },
    attendanceId: string
    navigate: (path: string) => void;
}


export const updateAttendanceById = createAsyncThunk('attendance/updateAttendanceById', async ({ values, attendanceId, navigate }: updateAttendanceById) => {

    const { entryTime, exitTime } = values


    const updatedAttendanceData = {
        entry_time: entryTime,
        exit_time: exitTime
    }

    try {
        const response = await apiClient.put(`attendance/${attendanceId}`, updatedAttendanceData, config);
        if (response.status) {
            toast.success("Successfully updated attendance", {
                className: 'custom-toast-success',
                progressStyle: { background: '#ffffff' },
            })
        }

        navigate('/attendance')

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        toast.error(errorMessage, {
            className: 'custom-toast-error',
            progressStyle: { background: '#C53C43' },
        });
    }

})