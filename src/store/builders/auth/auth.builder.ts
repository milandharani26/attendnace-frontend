import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import apiClient from '../../../services/axios';
import { setToken } from '../../../utility/genricFunctions';

interface LoginParams {
  userEmail: string;
  userPassword: string;
  navigate: (path: string) => void; // Type for navigate function
}

interface LogoutParams {
  userId: string;
}

interface LoginResponse {
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


export const login = createAsyncThunk(
  'auth/login',
  async ({ userEmail, userPassword, navigate }: LoginParams) => {

    const data = {
      user_email: userEmail,
      user_password: userPassword
    }

    try {
      const response: LoginResponse = await apiClient.post(
        'auth/login',
        data,
        config
      );

      setToken(response.data.token)

      const userRole = response?.data?.roleName

      if (response.status === 200) {

        if (userRole?.role_name == "employee") {
          // console.log("in emploeyeeeee 777777777")
          navigate('/employee');
        } else {
          console.log("dashboard")
          navigate('/dashboard');
        }


        toast.success("Successfully login", {
          // className: 'custom-toast-success',
          progressStyle: { background: '#ffffff' },
        })
      }



      const userData = { user: response.data.user, userRole, employee: response.data.employeeData }

      return userData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'An error occurred';

      toast.error(errorMessage, {
        // className: 'custom-toast-error',
        progressStyle: { background: '#C53C43' },
      });
    }
  }
);


export const logout = createAsyncThunk(
  'auth/logout',
  async ({ userId }: LogoutParams) => {


    try {
      const response = await apiClient.post('auth/logout', { userId });

      if (response.status === 200) {

        toast.success("Successfully login", {
          // className: 'custom-toast-success',
          progressStyle: { background: '#ffffff' },
        })
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'An error occurred';

      toast.error(errorMessage, {
        // className: 'custom-toast-error',
        progressStyle: { background: '#C53C43' },
      });
    }
  }
);


// export const resetOtp = createAsyncThunk(
//   'auth/resetOtp',
//   async ({ userEmail, userPassword, navigate }: LoginParams) => {

//     const data = {
//       user_email: userEmail,
//       user_password: userPassword
//     }

//     try {
//       const response: LoginResponse = await apiClient.post(
//         'auth/resetOtp',
//         data,
//         config
//       );

//       setToken(response.data.token)

//       const userRole = response?.data?.roleName

//       if (response.status === 200) {

//         if (userRole?.role_name == "employee") {
//           navigate('/employee');
//         } else {
//           navigate('/dashboard');
//         }


//         toast.success("Successfully login", {
//           // className: 'custom-toast-success',
//           progressStyle: { background: '#ffffff' },
//         })
//       }



//       const userData = { user: response.data.user, userRole, employee: response.data.employeeData }

//       return userData;
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       const errorMessage = error?.response?.data?.message || 'An error occurred';

//       toast.error(errorMessage, {
//         // className: 'custom-toast-error',
//         progressStyle: { background: '#C53C43' },
//       });
//     }
//   }
// );
