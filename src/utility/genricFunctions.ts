import { Dispatch } from '@reduxjs/toolkit'
import { eachDayOfInterval } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'



/////////////

export const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? JSON.parse(token) : null
}

export const setToken = (token: string) => {
  localStorage.setItem('token', JSON.stringify(token))
}


///////////

interface DecodedToken {
  exp: number; // The 'exp' property is a timestamp in seconds
}

export const isTokenExpired = (token: string): boolean => {
  const decodedToken = jwtDecode<DecodedToken>(token)
  const currentTime = Date.now() / 1000
  return decodedToken.exp < currentTime
}


//////////////

interface Action {
  type: string;
}

interface navigate {
  navigate: (path: string) => void;
}


export const removeUserSession = (dispatch: Dispatch<Action>, navigate: navigate): void => {
  localStorage.removeItem('token');

  // Clear extra reducers
  dispatch({ type: 'auth/clearExtraReducers' });
  dispatch({ type: 'employee/clearExtraReducers' });
  dispatch({ type: 'attendance/clearExtraReducers' });
  dispatch({ type: 'office/clearExtraReducers' });

  toast.success("Successfully logout", {
    className: 'custom-toast-success',
    progressStyle: { background: '#ffffff' },
  })

  if (navigate) {
    navigate("/login")
  }
};

///////////////////////


export function formatDateToYYYYMMDD(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

//////////////////////////////



export function capitalizeName(name: string) {
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}


////////////////////////



export function formatDateString(dateString) {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Extract components from the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format to "YYYY-MM-DD HH:MM:SS"
  // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return `${year}-${month}-${day}`;
}



//////////////////////////////////////////


export const generateMonthDates = (start, end) => {
  return eachDayOfInterval({ start, end });
};


///////////////////////////////////////

export const checkPermission = (requiredRole: Array, roleName: string) => {
  return requiredRole.includes(roleName.toLocaleLowerCase()) ? true : false
}