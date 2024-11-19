import { createSlice } from "@reduxjs/toolkit";
import { getAllPlans } from "../../builders/plan/plan.builder";


const initialState = {
    loading: false,
    formEditId: null,
    PlansData: [],
}


const planSlice = createSlice({
    name: "plan",
    initialState,
    reducers: {
        clearExtraReducers: (state) => {
            state.loading = false
            state.formEditId = null
            state.PlansData = []
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getAllPlans.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllPlans.fulfilled, (state, action) => {
            state.loading = false;
            state.PlansData = action.payload ?? []
        })
        builder.addCase(getAllPlans.rejected, (state) => {
            state.loading = false;
        })
    }
})


export const { clearExtraReducers } = planSlice.actions
export default planSlice.reducer