import { toast } from 'react-toastify';
import apiClient from '../../../services/axios';
import { configureStore } from '@reduxjs/toolkit';
import { createOffice, deleteOfficeById, editOfficeById, getAllOffices, updateOfficeById } from './office.builder';
import officeReducer from '../../slices/office/office.slice'

jest.mock('../../../services/axios');
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Office Thunks', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully create office', async () => {
        const mockResponse = { status: 200, data: { message: 'Office added successfully' } };
        (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);
        const values = {
            officeName: 'Test Office',
            officeLocation: 'Test Location',
            officeEmail: 'test@office.com',
            userName: 'Test User',
            userEmail: 'test@user.com',
            password: 'password123',
            birthday: new Date(),
            age: '30',
            orgId: 'org123',
        };
        const navigate = jest.fn();

        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        await mockStore.dispatch(createOffice({ values, navigate }));

        expect(toast.success).toHaveBeenCalledWith('Success full added office', expect.anything());
        expect(navigate).toHaveBeenCalledWith('/office');
    });

    it('should fail to create office and show error', async () => {
        const mockError = { response: { data: { message: 'Office creation failed' } } };
        (apiClient.post as jest.Mock).mockRejectedValue(mockError);

        const values = {
            officeName: 'Test Office',
            officeLocation: 'Test Location',
            officeEmail: 'test@office.com',
            userName: 'Test User',
            userEmail: 'test@user.com',
            password: 'password123',
            birthday: new Date(),
            age: '30',
            orgId: 'org123',
        };
        const navigate = jest.fn();

        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        await mockStore.dispatch(createOffice({ values, navigate }));

        expect(toast.error).toHaveBeenCalledWith('Office creation failed', expect.anything());
    });

    it('should successfully fetch all offices', async () => {
        const mockResponse = { status: 200, data: { data: [{ office_id: '1', office_name: 'Test Office' }] } };
        (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

        const mockStore = configureStore({
            reducer: {
                office: officeReducer
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        await mockStore.dispatch(getAllOffices());

        expect(toast.success).toHaveBeenCalledWith('Success all Employees', expect.anything());

        const state = mockStore.getState().office;
        expect(state.officeTableData).toEqual([{ id: '1', office_id: "1", office_name: 'Test Office' }]);
    });
    //er
    it('should fail to fetch all offices and show error', async () => {
        const mockError = { response: { data: { message: 'Failed to fetch offices' } } };
        (apiClient.post as jest.Mock).mockRejectedValue(mockError);

        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        await mockStore.dispatch(getAllOffices());

        expect(toast.error).toHaveBeenCalledWith('An error occurred', expect.anything());
    });


    //errrorr
    it('should successfully edit office by id', async () => {
        const mockResponse = { status: 200, data: { result: { office_name: 'Updated Office' } } };

        // Mock the GET request
        (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

        const officeId = '1';

        const mockStore = configureStore({
            reducer: {
                office: officeReducer, // Ensure the officeReducer is included
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        // Dispatch the editOfficeById action
        await mockStore.dispatch(editOfficeById(officeId));

        // Check if toast.success was called with the correct message
        expect(toast.success).toHaveBeenCalledWith('Success get office', expect.anything());

        // Get the state and check if formEditId was updated correctly
        const state = mockStore.getState().office;
        expect(state.formEditId).toEqual({ office_name: 'Updated Office' });
    });

    //errr
    it('should fail to get office and show error', async () => {
        const mockError = { response: { data: { message: 'An error occurred' } } };
        (apiClient.post as jest.Mock).mockRejectedValue(mockError);

        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });


        const officeId = '1';
        await mockStore.dispatch(editOfficeById(officeId));

        expect(toast.error).toHaveBeenCalledWith('An error occurred', expect.anything());
    });

    //err
    it('should successfully update office by id', async () => {
        const mockResponse = { status: 200, data: { message: 'Office updated successfully' } };
        (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

        const values = {
            officeName: 'Updated Office',
            officeLocation: 'Updated Location',
            officeEmail: 'updated@office.com',
            userName: 'Updated User',
            userEmail: 'updated@user.com',
            password: 'newpassword123',
            birthday: new Date(),
            age: '31',
            userId: 'user123',
            orgId: 'org123',
        };
        const navigate = jest.fn();
        const officeId = '1';


        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });


        await mockStore.dispatch(updateOfficeById({ values, officeId, navigate }));

        expect(toast.success).toHaveBeenCalledWith('Success get office', expect.anything());
        expect(navigate).toHaveBeenCalledWith('/office');
    });

    it('should fail to update office and show error', async () => {
        const mockError = { response: { data: { message: 'Failed to update office' } } };
        (apiClient.post as jest.Mock).mockRejectedValue(mockError);

        const values = {
            officeName: 'Updated Office',
            officeLocation: 'Updated Location',
            officeEmail: 'updated@office.com',
            userName: 'Updated User',
            userEmail: 'updated@user.com',
            password: 'newpassword123',
            birthday: new Date(),
            age: '31',
            userId: 'user123',
            orgId: 'org123',
        };
        const navigate = jest.fn();
        const officeId = '1';

        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });


        await mockStore.dispatch(updateOfficeById({ values, officeId, navigate }));

        expect(toast.error).toHaveBeenCalledWith('An error occurred', expect.anything());
    });

    (it('should successfully delete office', async () => {
        const mockResponse = { status: 200, data: { message: 'Office deleted successfully' } };
        (apiClient.delete as jest.Mock).mockResolvedValue(mockResponse);

        const id = '1';

        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        await mockStore.dispatch(deleteOfficeById(id));

        expect(toast.success).toHaveBeenCalledWith('Successfully deleted office', expect.anything());
    }));

    it('should fail to delete office and show error', async () => {
        const mockError = { response: { data: { message: 'Failed to delete office' } } };
        (apiClient.post as jest.Mock).mockRejectedValue(mockError);
        const id = '1';


        const mockStore = configureStore({
            reducer: {},
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({}),
        });

        await mockStore.dispatch(deleteOfficeById(id));

        expect(toast.error).toHaveBeenCalledWith('An error occurred', expect.anything());
    });
});
