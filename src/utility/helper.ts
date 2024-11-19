import * as Yup from 'yup';



export const employeeValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .required('Age is required')
      .min(18, 'Age must be at least 18')
      .max(65, 'Age cannot exceed 65'),
    birthday: Yup.date()
      .required('Birthday is required')
      .max(new Date(), 'Birthday cannot be in the future'),
    department: Yup.string()
      .required('Department is required')
      .min(3, 'Department name must be at least 3 characters'),
    designation: Yup.string()
      .required('Designation is required')
      .min(3, 'Designation name must be at least 3 characters'),
    employeeImage: Yup.mixed()
      .required('Employee image is required')
      // .test('fileSize', 'File size is too large', (value) =>
      //   value ? value.size <= 2000000 : true
      // )
      // .test('fileFormat', 'Unsupported Format', (value) =>
      //   value ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type) : true
      // ),
  });



export const officeValidationSchema = Yup.object().shape({
    officeName: Yup.string()
      .required('Office name is required')
      .min(2, 'Office name must be at least 2 characters')
      .max(100, 'Office name cannot exceed 100 characters'),
    
    officeLocation: Yup.string()
      .required('Office location is required')
      .min(3, 'Location must be at least 3 characters')
      .max(100, 'Location cannot exceed 100 characters'),
    
    officeEmail: Yup.string()
      .email('Invalid email format')
      .required('Office email is required'),
    
    userName: Yup.string()
      .required('User name is required')
      .min(2, 'User name must be at least 2 characters')
      .max(50, 'User name cannot exceed 50 characters'),
    
    userEmail: Yup.string()
      .email('Invalid email format')
      .required('User email is required'),
    
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password cannot exceed 20 characters'),
    
    birthday: Yup.date()
      .required('Birthday is required')
      .max(new Date(), 'Birthday cannot be in the future'),
    
    age: Yup.number()
      .typeError('Age must be a number')
      .required('Age is required')
      .min(18, 'Age must be at least 18')
      .max(100, 'Age cannot exceed 100'),
  });
  
  