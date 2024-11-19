import apiClient from '../../../services/axios';
import { toast } from 'react-toastify';
import { createEmployee, deleteEmployeeById, getAllEmployees, getAllEmployeesCount, getEmployeeById, updateEmployeeById } from './employee.builder';
import { configureStore } from '@reduxjs/toolkit';

// Mock dependencies
jest.mock('../../../services/axios');
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));
describe('Employee Actions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createEmployee', () => {
        it('should create an employee successfully and navigate to /employee', async () => {
            const mockResponse = { status: 200 };
            (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

            const employeeData = {
                values: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123',
                    age: '30',
                    birthday: new Date(),
                    department: 'Engineering',
                    designation: 'Developer',
                    employeeImage: '',
                },
                orgId: 'org123',
                officeId: 'office123',
                navigate: jest.fn(),
            };

            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(createEmployee(employeeData));

            expect(apiClient.post).toHaveBeenCalledWith(
                'employee',
                expect.objectContaining({
                    user_name: 'John Doe',
                }),
                expect.any(Object)
            );
            expect(toast.success).toHaveBeenCalledWith('Successfully added Employee', expect.any(Object));
            expect(employeeData.navigate).toHaveBeenCalledWith('/employee');
        });

        it('should handle API errors gracefully', async () => {
            const mockError = { response: { data: { message: 'Error occurred' } } };
            (apiClient.post as jest.Mock).mockRejectedValue(mockError);

            const employeeData = {
                values: { name: 'John Doe', email: 'john@example.com', password: 'password123', age: '30', birthday: new Date(), department: 'Engineering', designation: 'Developer', employeeImage: '' },
                orgId: 'org123',
                officeId: 'office123',
                navigate: jest.fn(),
            };

            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(createEmployee(employeeData));

            expect(toast.error).toHaveBeenCalledWith('Error occurred', expect.any(Object));
        });
    });



    describe('getAllEmployees', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should fetch employees with both orgId and officeId', async () => {
            const mockResponse = { status: 200, data: { data: [{ empId: '1', name: 'John Doe' }] } };
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const payload = { orgId: 'org123', officeId: 'office123' };
            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(getAllEmployees(payload));

            expect(apiClient.get).toHaveBeenCalledWith('employee/filter?org_id=org123&office_id=office123');
            expect(toast.success).toHaveBeenCalledWith('Successfully retrieved all employees', expect.any(Object));
        });

        it('should fetch employees with only orgId', async () => {
            const mockResponse = { status: 200, data: { data: [{ empId: '1', name: 'John Doe' }] } };
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const payload = { orgId: 'org123' };
            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(getAllEmployees(payload));

            expect(apiClient.get).toHaveBeenCalledWith('employee/filter?org_id=org123');
            expect(toast.success).toHaveBeenCalledWith('Successfully retrieved all employees', expect.any(Object));
        });

        it('should fetch employees with only officeId', async () => {
            const mockResponse = { status: 200, data: { data: [{ empId: '1', name: 'John Doe' }] } };
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const payload = { officeId: 'office123' };
            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(getAllEmployees(payload));

            expect(apiClient.get).toHaveBeenCalledWith('employee/filter?office_id=office123');
            expect(toast.success).toHaveBeenCalledWith('Successfully retrieved all employees', expect.any(Object));
        });

        it('should fetch employees with no parameters', async () => {
            const mockResponse = { status: 200, data: { data: [{ empId: '1', name: 'John Doe' }] } };
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const payload = {};
            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(getAllEmployees(payload));

            expect(apiClient.get).toHaveBeenCalledWith('employee/filter');
            expect(toast.success).toHaveBeenCalledWith('Successfully retrieved all employees', expect.any(Object));
        });

        it('should handle API errors gracefully', async () => {
            const mockError = { response: { data: { message: 'Error fetching employees' } } };
            (apiClient.get as jest.Mock).mockRejectedValue(mockError);

            const payload = { orgId: 'org123' };
            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(getAllEmployees(payload));

            expect(toast.error).toHaveBeenCalledWith('Error fetching employees', expect.any(Object));
        });

        it('should handle API errors when no parameters are provided', async () => {
            const mockError = { response: { data: { message: 'Error fetching employees' } } };
            (apiClient.get as jest.Mock).mockRejectedValue(mockError);

            const payload = {};
            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(getAllEmployees(payload));

            expect(toast.error).toHaveBeenCalledWith('Error fetching employees', expect.any(Object));
        });
    });

    describe('getEmployeeById', () => {
        it('should fetch an employee by ID successfully', async () => {
            const mockResponse = { status: 200, data: { data: [{ empId: '1', name: 'John Doe' }] } };
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const empId = '1';

            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(getEmployeeById(empId));

            expect(apiClient.get).toHaveBeenCalledWith('employee/filter?emp_id=1');
            expect(toast.success).toHaveBeenCalledWith('Successfully get Employee', expect.any(Object));
        });
    });

    describe('updateEmployeeById', () => {
        it('should update an employee successfully', async () => {
            const mockResponse = { status: 200 };
            (apiClient.put as jest.Mock).mockResolvedValue(mockResponse);

            const payload = {
                values: {
                    department: 'Engineering',
                    designation: 'Lead Developer',
                    faceEncodings: '[0.123, 0.456]',
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123',
                    birthday: '1990-01-01',
                    age: '30',
                },
                userId: 'user123',
                empId: 'emp123',
                officeId: 'office123',
                orgId: 'org123',
                navigate: jest.fn(),
            };

            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(updateEmployeeById(payload));

            expect(apiClient.put).toHaveBeenCalledWith(
                'employee/emp123',
                expect.objectContaining({
                    user_name: 'John Doe',
                }),
                expect.any(Object)
            );
            expect(toast.success).toHaveBeenCalledWith('Successfully updated office', expect.any(Object));
            expect(payload.navigate).toHaveBeenCalledWith('/employee');
        });
    });

    describe('deleteEmployeeById', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });


        it('should delete an employee successfully', async () => {
            const mockResponse = { status: 200 };
            (apiClient.delete as jest.Mock).mockResolvedValue(mockResponse);

            const payload = { id: 'emp123', orgId: 'org123', officeId: 'office123' };
            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(deleteEmployeeById(payload));

            expect(apiClient.delete as jest.Mock).toHaveBeenCalledWith('employee/emp123');
            expect(toast.success).toHaveBeenCalledWith('Successfully deleted employee', expect.any(Object));
            // Ensure getAllEmployees is called after successful deletion
            expect(mockStore.dispatch).toHaveBeenCalledWith(getAllEmployees({ orgId: 'org123', officeId: 'office123' }));
        });

        it('should handle API errors gracefully when deleting an employee', async () => {
            const mockError = { response: { data: { message: 'Failed to delete employee' } } };
            (apiClient.delete as jest.Mock).mockRejectedValue(mockError);

            const payload = { id: 'emp123', orgId: 'org123', officeId: 'office123' };
            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(deleteEmployeeById(payload));

            expect(toast.error).toHaveBeenCalledWith('Failed to delete employee', expect.any(Object));
            // Ensure that the correct error is thrown
            expect(apiClient.delete).toHaveBeenCalledWith('employee/emp123');
        });

        it('should handle API errors gracefully when no error message is provided', async () => {
            const mockError = { response: { data: {} } };
            (apiClient.delete as jest.Mock).mockRejectedValue(mockError);

            const payload = { id: 'emp123', orgId: 'org123', officeId: 'office123' };
            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });

            await mockStore.dispatch(deleteEmployeeById(payload));

            expect(toast.error).toHaveBeenCalledWith('An error occurred', expect.any(Object));
            expect(apiClient.delete).toHaveBeenCalledWith('employee/emp123');
        });
    });


    describe('getAllEmployeesCount', () => {
        it('should fetch employee count successfully', async () => {
            const mockResponse = { status: 200, data: { count: 10 } };
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const payload = { orgId: 'org123' };

            const mockStore = configureStore({
                reducer: {},
                middleware: (getDefaultMiddleware) =>
                    getDefaultMiddleware({}),
            });
            const result = await mockStore.dispatch(getAllEmployeesCount(payload));

            expect(apiClient.get).toHaveBeenCalledWith('employee/count?org_id=org123');
            expect(result.payload).toEqual(10);
        });
    });
});
