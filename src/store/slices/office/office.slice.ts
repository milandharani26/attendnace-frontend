import { createSlice } from "@reduxjs/toolkit";
import { createOffice, deleteOfficeById, editOfficeById, getAllOffices, updateOfficeById } from "../../builders/office/office.builder";
// import { jwtDecode } from "jwt-decode";


const initialState = {
    loading: false,
    formEditId: null,
    officeTableData: [],
}


const officeSlice = createSlice({
    name: "office",
    initialState,
    reducers: {
        setFormEditOfficeId: (state, action) => {
            state.formEditId = action.payload
        },
        updateOfficeData: (state, action) => {
            state.officeTableData = action.payload
        },
        clearExtraReducers: (state) => {
            state.loading = false
            state.formEditId = null
            state.officeTableData = []
        },
    },
    extraReducers: (builder) => {
        
        builder.addCase(createOffice.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createOffice.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(createOffice.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getAllOffices.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllOffices.fulfilled, (state, action) => {
            state.loading = false;
            state.officeTableData = action.payload
        })
        builder.addCase(getAllOffices.rejected, (state) => {
            state.loading = false;
        })
        
        builder.addCase(editOfficeById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(editOfficeById.fulfilled, (state, action) => {
            state.loading = false;
            state.formEditId = action.payload
        })
        builder.addCase(editOfficeById.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(updateOfficeById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateOfficeById.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(updateOfficeById.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(deleteOfficeById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteOfficeById.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(deleteOfficeById.rejected, (state) => {
            state.loading = false;
        })
        
    }
})


export const { setFormEditOfficeId, updateOfficeData, clearExtraReducers } = officeSlice.actions
export default officeSlice.reducer