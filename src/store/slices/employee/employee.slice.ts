import { createSlice } from "@reduxjs/toolkit";
import { createEmployee, getAllEmployees, getAllEmployeesCount, getEmployee, getEmployeeById, updateEmployeeById } from "../../builders/employee/employee.builder";
// import { jwtDecode } from "jwt-decode";


const initialState = {
    loading: false,
    formEditId: null,
    employeeTableData: [],
    allEmployeeCount: null
}


const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setFormEditEmployeeId: (state, action) => {
            state.formEditId = action.payload
        },
        updateEmployeeData: (state, action) => {
            state.employeeTableData = action.payload
        },
        clearExtraReducers: (state) => {
            state.loading = false
            state.formEditId = null
            state.employeeTableData = []
        },
    },
    extraReducers: (builder) => {

        builder.addCase(createEmployee.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createEmployee.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(createEmployee.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getAllEmployees.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllEmployees.fulfilled, (state, action) => {
            state.loading = false;
            state.employeeTableData = action.payload
        })
        builder.addCase(getAllEmployees.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getEmployeeById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getEmployeeById.fulfilled, (state, action) => {
            state.loading = false;
            state.formEditId = action.payload
        })
        builder.addCase(getEmployeeById.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(updateEmployeeById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateEmployeeById.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(updateEmployeeById.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getAllEmployeesCount.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllEmployeesCount.fulfilled, (state, action) => {
            state.loading = false;
            state.allEmployeeCount = action.payload
        })
        builder.addCase(getAllEmployeesCount.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getEmployee.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.employeeTableData = action.payload
        })
        builder.addCase(getEmployee.rejected, (state) => {
            state.loading = false;
        })

    }
})


export const { setFormEditEmployeeId, updateEmployeeData, clearExtraReducers } = employeeSlice.actions
export default employeeSlice.reducer