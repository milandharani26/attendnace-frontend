import { toast } from 'react-toastify';
import apiClient from '../../../services/axios';
import { setToken } from '../../../utility/genricFunctions';
import { configureStore } from '@reduxjs/toolkit';
import { login } from './auth.builder';

// Mocking necessary functions
jest.mock('../../../services/axios', () => ({
    post: jest.fn() as jest.Mock,
}));

jest.mock('../../../utility/genricFunctions', () => ({
    setToken: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('login thunk', () => {
    it('should dispatch login and navigate to the correct route when role is employee', async () => {
        const mockResponse = {
            data: { token: 'test-token', roleName: { role_name: 'employee' } },
            status: 200,
        };

        // Mocking apiClient.post and setToken
        (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);
        (setToken as jest.Mock).mockImplementation(() => { });

        // Create a mock store with explicitly typed middleware
        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        const navigate = jest.fn();
        const userEmail = 'test@example.com';
        const userPassword = 'password123';

        // Dispatch the login thunk
        await mockStore.dispatch(login({ userEmail, userPassword, navigate }));

        // Assertions for the 'employee' role
        expect(navigate).toHaveBeenCalledWith('/employee');
        expect(toast.success).toHaveBeenCalledWith('Successfully login', expect.anything());
        expect(setToken).toHaveBeenCalledWith('test-token');
    });

    it('should dispatch login and navigate to the dashboard when role is not employee', async () => {
        const mockResponse = {
            data: { token: 'test-token', roleName: { role_name: 'admin' } },  // Role is 'admin' here
            status: 200,
        };

        // Mocking apiClient.post and setToken
        (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);
        (setToken as jest.Mock).mockImplementation(() => { });

        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        const navigate = jest.fn();
        const userEmail = 'test@example.com';
        const userPassword = 'password123';

        // Dispatch the login thunk
        await mockStore.dispatch(login({ userEmail, userPassword, navigate }));

        // Assertions for the non-'employee' role (in this case 'admin')
        expect(navigate).toHaveBeenCalledWith('/dashboard');  // Ensure '/dashboard' is navigated to
        expect(toast.success).toHaveBeenCalledWith('Successfully login', expect.anything());
        expect(setToken).toHaveBeenCalledWith('test-token');
    });

    it('should handle error correctly', async () => {
        const mockErrorResponse = {
            response: { data: { message: 'An error occurred' } },
        };

        (apiClient.post as jest.Mock).mockRejectedValue(mockErrorResponse);
        (setToken as jest.Mock).mockImplementation(() => { });

        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        const navigate = jest.fn();
        const userEmail = 'test@example.com';
        const userPassword = 'password123';

        await mockStore.dispatch(login({ userEmail, userPassword, navigate }));

        expect(toast.error).toHaveBeenCalledWith('An error occurred', expect.anything());
    });
});
