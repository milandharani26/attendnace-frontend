import { toast } from 'react-toastify';
import apiClient from '../../../services/axios';
import { configureStore } from '@reduxjs/toolkit';
import { getAllPlans } from './plan.builder';
import planReducer from '../../slices/plan/plan.slice'


jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('../../../services/axios', () => ({
    get: jest.fn(),
}));

describe('getAllPlans async thunk', () => {

    // Reset mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should dispatch success toast on successful API call', async () => {
        const mockResponse = { status: 200, data: { data: [] } };

        // Mock successful API response
        (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

        // Create a mock store with the plan reducer
        const mockStore = configureStore({
            reducer: {
                plan: planReducer, // Ensure the planReducer is included
            },
        });

        // Dispatch the getAllPlans action
        await mockStore.dispatch(getAllPlans());

        // Check if toast.success was called with the correct message
        expect(toast.success).toHaveBeenCalledWith('Success all Employees', expect.anything());
    });

    it('should dispatch error toast when the API call fails', async () => {
        const mockErrorResponse = { response: { data: { message: 'Error fetching plans' } } };

        // Mock failed API response
        (apiClient.get as jest.Mock).mockRejectedValue(mockErrorResponse);

        const mockStore = configureStore({
            reducer: {
                plan: planReducer, // Ensure the planReducer is included
            },
        });

        // Dispatch the getAllPlans action
        await mockStore.dispatch(getAllPlans());

        // Check if toast.error was called with the correct message
        expect(toast.error).toHaveBeenCalledWith('Error fetching plans', expect.anything());
    });

    it('should dispatch error toast with default message when API returns an unknown error', async () => {
        const mockUnknownErrorResponse = { response: {} };

        // Mock failed API response with no message
        (apiClient.get as jest.Mock).mockRejectedValue(mockUnknownErrorResponse);

        const mockStore = configureStore({
            reducer: {
                plan: planReducer, // Ensure the planReducer is included
            },
        });

        // Dispatch the getAllPlans action
        await mockStore.dispatch(getAllPlans());

        // Check if toast.error was called with the default error message
        expect(toast.error).toHaveBeenCalledWith('An error occurred', expect.anything());
    });

    it('should handle empty data response gracefully', async () => {
        const mockEmptyResponse = { status: 200, data: { data: [] } };

        // Mock empty data API response
        (apiClient.get as jest.Mock).mockResolvedValue(mockEmptyResponse);

        const mockStore = configureStore({
            reducer: {
                plan: planReducer, // Ensure the planReducer is included
            },
        });

        // Dispatch the getAllPlans action
        await mockStore.dispatch(getAllPlans());

        // Since no data was returned, ensure the toast.success was called
        expect(toast.success).toHaveBeenCalledWith('Success all Employees', expect.anything());
    });

    it('should handle unexpected API structure gracefully', async () => {
        const mockInvalidResponse = { status: 200, data: {} };

        // Mock an invalid API response
        (apiClient.get as jest.Mock).mockResolvedValue(mockInvalidResponse);

        const mockStore = configureStore({
            reducer: {
                plan: planReducer, // Ensure the planReducer is included
            },
        });

        // Dispatch the getAllPlans action
        await mockStore.dispatch(getAllPlans());

        // Check if toast.success was called with the correct message
        expect(toast.success).toHaveBeenCalledWith('Success all Employees', expect.anything());
    });
});
