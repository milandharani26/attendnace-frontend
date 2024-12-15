import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { getToken, removeUserSession } from "../utility/genricFunctions";
import { ReactNode } from "react";
import Login from "../pages/login/Login";
import Layout from "../layout/Layout";
import ForgotPasswordPage from "../pages/forgotPassword/ForgotPassword";
import OfficeList from "../pages/office/OfficeList";
import EmployeeList from "../pages/employee/EmployeeList";
import AttendanceList from "../pages/attendance/AttendanceList";
import AddEmployeeForm from "../pages/employee/AddEmployeeForm";
import AddOfficeForm from "../pages/office/AddOfficeForm";
import Dashboard from "../pages/dashboard/Dashboard";
import EmployeeAttendanceHistory from "../pages/employee/EmployeeAttendanceHistory";
import AttendanceForm from "../pages/attendance/AttendanceForm";
import Plans from "../pages/plans/Plans";
import SignUp from "../pages/signup/Signup";
import AboutProductPage from "../pages/aboutProductPage/AboutProductPage";
import { useAppDispatch } from "../store/store";
// import AboutProductPage from "../pages/aboutProductPage/AboutProductPage";

interface RouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const token = getToken();
  // const useRole = useSelector(store => store?.auth?.user?.userRole?.role_name)

  if (token) {
    return <Navigate to="/dashboard" />;
  } else {
    return <>{children}</>;
  }
};

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const token = getToken();

  if (token) {
    return <>{children}</>;
  } else {
    removeUserSession(dispatch);
    return <Navigate to="/login" />;
  }
};

const CheckNavigation: React.FC = () => {
  const token = getToken();

  if (token) {
    console.log("dashboard")
    return <Navigate replace to="/dashboard" />;
  } else {
    return <Navigate replace to="/login" />;
  }
};

const roleBasedRouting = [
  {
    route: '/office',
    role: ['orgadmin', 'superadmin'],
    element: (
      <PrivateRoute>
        <Layout>
          <OfficeList />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    route: '/employee',
    role: ['orgadmin', 'superadmin', 'officeadmin', 'employee'],
    element: (
      <PrivateRoute>
        <Layout>
          <EmployeeList />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    route: '/attendance',
    role: ['orgadmin', 'superadmin', 'officeadmin'],
    element: (
      <PrivateRoute>
        <Layout>
          <AttendanceList />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    route: '/attendance/add-attendance/:id',
    role: ['orgadmin', 'superadmin', 'officeadmin'],
    element: (
      <PrivateRoute>
        <Layout>
          <AttendanceForm />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    route: '/employee/add-employee',
    role: ['orgadmin', 'superadmin', 'officeadmin'],
    element: (
      <PrivateRoute>
        <Layout>
          <AddEmployeeForm />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    route: '/employee/attendance-history/:id',
    role: ['orgadmin', 'superadmin', 'officeadmin'],
    element: (
      <PrivateRoute>
        <Layout>
          <EmployeeAttendanceHistory />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    route: '/employee/add-employee/:id',
    role: ['orgadmin', 'superadmin', 'officeadmin'],
    element: (
      <PrivateRoute>
        <Layout>
          <AddEmployeeForm />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    route: '/office/add-office',
    role: ['orgadmin', 'superadmin', 'officeadmin'],
    element: (
      <PrivateRoute>
        <Layout>
          <AddOfficeForm />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    route: '/office/add-office/:id',
    role: ['orgadmin', 'superadmin', 'officeadmin'],
    element: (
      <PrivateRoute>
        <Layout>
          <AddOfficeForm />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    route: '/dashboard',
    role: ['orgadmin', 'superadmin', 'officeadmin'],
    element: (
      <PrivateRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </PrivateRoute>
    ),
  },
]

export const RoutesPage = () => {
  // const useRole = useSelector(store => store?.auth?.user?.userRole?.role_name)

  return (
    <Router>
      <Routes>
        {/* <Route path='*' element={!token?.accessToken ? <Navigate to='/login' replace /> : <NotFound />} /> */}
        <Route path='/' element={CheckNavigation()} />
        {/* <Route path="/" element={<Login />} /> */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              {/* <ErrorBoundary> */}
              <Login />
              {/* </ErrorBoundary> */}
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            //   <PublicRoute>
            // <ErrorBoundary>
            <ForgotPasswordPage />
            // </ErrorBoundary>
            //   </PublicRoute>
          }
        />

        <Route
          path="/sign-up"
          element={
            //   <PublicRoute>
            // <ErrorBoundary>
            <SignUp />
            // </ErrorBoundary>
            //   </PublicRoute>
          }
        />

        <Route
          path="/plans"
          element={
            //   <PublicRoute>
            // <ErrorBoundary>
            <Plans />
            // </ErrorBoundary>
            //   </PublicRoute>
          }
        />

        <Route
          path="/home"
          element={
            //   <PublicRoute>
            // <ErrorBoundary>
            <AboutProductPage />
            // </ErrorBoundary>
            //   </PublicRoute>
          }
        />

        <Route
          path="/office"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary> */}
              <Layout>
                <OfficeList />
              </Layout>
              {/* </ErrorBoundary> */}
            </PrivateRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <Layout>
              <EmployeeList />
            </Layout>
          }
        />


        < Route
          path="/attendance"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary> */}
              <Layout>
                <AttendanceList />
              </Layout>
              {/* </ErrorBoundary> */}
            </PrivateRoute >
          }
        />

        < Route
          path="/attendance/add-attendance/:id"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary> */}
              <Layout>
                <AttendanceForm />
              </Layout>
              {/* </ErrorBoundary> */}
            </PrivateRoute >
          }
        />

        < Route
          path="employee/add-employee"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary> */}
              <Layout>
                <AddEmployeeForm />
              </Layout>
              {/* </ErrorBoundary> */}
            </PrivateRoute >
          }
        />

        < Route
          path="employee/attendance-history/:id"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary> */}
              <Layout>
                <EmployeeAttendanceHistory />
              </Layout>
              {/* </ErrorBoundary> */}
            </PrivateRoute >
          }
        />

        < Route
          path="employee/add-employee/:id"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary> */}
              <Layout>
                <AddEmployeeForm />
              </Layout>
              {/* </ErrorBoundary> */}
            </PrivateRoute >
          }
        />

        < Route
          path="office/add-office"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary> */}
              <Layout>
                <AddOfficeForm />
              </Layout>
              {/* </ErrorBoundary> */}
            </PrivateRoute >
          }
        />

        < Route
          path="office/add-office/:id"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary> */}
              <Layout>
                <AddOfficeForm />
              </Layout>
              {/* </ErrorBoundary> */}
            </PrivateRoute >
          }
        />

        < Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary> */}
              <Layout>
                <Dashboard />
              </Layout>
              {/* </ErrorBoundary> */}
            </PrivateRoute >
          }
        />

        {/* requiredRole.includes(useRole.toLocaleLowerCase()) ? true : false */}

        {/* {roleBasedRouting
          .filter((data) => data?.role?.includes(useRole?.toLocaleLowerCase()))
          .map((data) => {
            return <Route key={data.route} path={data.route} element={{ ...data.element }} />
          })} */}

      </Routes >
    </Router >
  );
};
