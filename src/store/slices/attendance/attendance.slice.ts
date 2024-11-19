import { createSlice } from "@reduxjs/toolkit";
import { getAllAttendance, getAttendanceById, getAttendanceHistory, getTodayAttendanceCount } from "../../builders/attendance/attendance.builder";
// import { jwtDecode } from "jwt-decode";


const initialState = {
    loading: false,
    formEditId: null,
    attendanceTableData: [],
    todayAttendanceCount: null,
    attendanceHistory: [],
}


const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        setFormEditEmployeeId: (state, action) => {
            state.formEditId = action.payload
        },
        updateEmployeeData: (state, action) => {
            state.attendanceTableData = action.payload
        },
        clearExtraReducers: (state) => {
            state.loading = false
            state.formEditId = null
            state.attendanceTableData = []
            state.todayAttendanceCount = null
            state.attendanceHistory = []
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getAllAttendance.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllAttendance.fulfilled, (state, action) => {
            state.loading = false;
            state.attendanceTableData = action.payload
        })
        builder.addCase(getAllAttendance.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getTodayAttendanceCount.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getTodayAttendanceCount.fulfilled, (state, action) => {
            state.loading = false;
            state.todayAttendanceCount = action.payload
        })
        builder.addCase(getTodayAttendanceCount.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getAttendanceHistory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAttendanceHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.attendanceHistory = action.payload ?? []
        })
        builder.addCase(getAttendanceHistory.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getAttendanceById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAttendanceById.fulfilled, (state, action) => {
            state.loading = false;
            state.formEditId = action.payload
        })
        builder.addCase(getAttendanceById.rejected, (state) => {
            state.loading = false;
        })

    }
})


export const { setFormEditEmployeeId, updateEmployeeData, clearExtraReducers } = attendanceSlice.actions
export default attendanceSlice.reducer