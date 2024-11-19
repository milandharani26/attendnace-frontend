import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth/auth.slice"
import empReducer from "./slices/employee/employee.slice"
import offReducer from "./slices/office/office.slice"
import attReducer from "./slices/attendance/attendance.slice"
import planReducer from "./slices/plan/plan.slice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistAuthConfig = {
  key: "auth",
  storage,
};

const persistEmployeeConfig = {
  key: "employee",
  storage
}

const persistOfficeConfig = {
  key: "office",
  storage
}

const persistAttendanceConfig = {
  key: "attendance",
  storage
}

const persistPlansConfig = {
  key: "plan",
  storage
}



const authenticationReducer = persistReducer(persistAuthConfig, authReducer);

const employeeReducer = persistReducer(persistEmployeeConfig, empReducer);

const officeReducer = persistReducer(persistOfficeConfig, offReducer);

const attendanceReducer = persistReducer(persistAttendanceConfig, attReducer)

const plansReducer = persistReducer(persistPlansConfig, planReducer)


export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    employee: employeeReducer,
    office: officeReducer,
    attendance: attendanceReducer,
    plan: plansReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
