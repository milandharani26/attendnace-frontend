import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AttendanceForm from './AttendanceForm';
import { getAttendanceById, updateAttendanceById } from '../../store/builders/attendance/attendance.builder';
import userEvent from '@testing-library/user-event';
import { store } from '../../store/store';

jest.mock('../../store/builders/attendance/attendance.builder', () => ({
    getAttendanceById: jest.fn(),
    updateAttendanceById: jest.fn(),
}));

describe('AttendanceForm Component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the AttendanceForm component', () => {
        render(
            <Provider store={store}>
                <Router>
                    <AttendanceForm />
                </Router>
            </Provider>
        );

        expect(screen.getByText('Attendance Form')).toBeInTheDocument();
        expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Entry Time/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Exit Time/)).toBeInTheDocument();
        expect(screen.getByText(/Save/)).toBeInTheDocument();
    });

    it('sets initial values when editing an attendance entry', async () => {
        const mockAttendanceData = {
            userName: 'John Doe',
            entryTime: '09:00',
            exitTime: '17:00',
        };

        // Mock the getAttendanceById to return mock data
        (getAttendanceById as unknown as jest.Mock).mockResolvedValue(mockAttendanceData);

        // Render the component with an id in the URL params
        render(
            <Provider store={store}>
                <Router>
                    <AttendanceForm />
                </Router>
            </Provider>
        );

        // Check that initial values are set correctly
        await waitFor(() => {
            expect((screen.getByLabelText(/Name/) as HTMLInputElement).value).toBe(mockAttendanceData.userName);
            expect((screen.getByLabelText(/Entry Time/) as HTMLInputElement).value).toBe(mockAttendanceData.entryTime);
            expect((screen.getByLabelText(/Exit Time/) as HTMLInputElement).value).toBe(mockAttendanceData.exitTime);
        });
    });

    it('submits the form with correct data when the Save button is clicked', async () => {
        const mockAttendanceData = {
            userName: 'Jane Doe',
            entryTime: '10:00',
            exitTime: '18:00',
        };

        // Mock the dispatch for updateAttendanceById
        (updateAttendanceById as unknown as jest.Mock).mockResolvedValue({});

        render(
            <Provider store={store}>
                <Router>
                    <AttendanceForm />
                </Router>
            </Provider>
        );

        const nameInput = screen.getByLabelText(/Name/) as HTMLInputElement;
        const entryTimeInput = screen.getByLabelText(/Entry Time/) as HTMLInputElement;
        const exitTimeInput = screen.getByLabelText(/Exit Time/) as HTMLInputElement;
        const saveButton = screen.getByText(/Save/);

        // Fill the form
        userEvent.type(nameInput, mockAttendanceData.userName);
        userEvent.type(entryTimeInput, mockAttendanceData.entryTime);
        userEvent.type(exitTimeInput, mockAttendanceData.exitTime);

        // Mock the form submission action
        userEvent.click(saveButton);

        await waitFor(() => {
            expect(updateAttendanceById).toHaveBeenCalledWith({
                values: mockAttendanceData,
                attendanceId: expect.any(String), // Expect the attendance ID to be passed
                navigate: expect.any(Function), // Expect the navigate function to be passed
            });
        });
    });

    it('dispatches the updateAttendanceById action when an id is present', async () => {
        const mockAttendanceData = {
            userName: 'Jane Doe',
            entryTime: '10:00',
            exitTime: '18:00',
        };

        // Mock the getAttendanceById to return mock data
        (getAttendanceById as unknown as jest.Mock).mockResolvedValue(mockAttendanceData);

        render(
            <Provider store={store}>
                <Router>
                    <AttendanceForm />
                </Router>
            </Provider>
        );

        const saveButton = screen.getByText(/Save/);
        userEvent.click(saveButton);

        await waitFor(() => {
            expect(updateAttendanceById).toHaveBeenCalled();
        });
    });

    it('renders bread crumbs correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <AttendanceForm />
                </Router>
            </Provider>
        );

        // Check if bread crumbs are rendered
        expect(screen.getByText('Attendance Form')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('AttendanceList')).toBeInTheDocument();
    });

    it('does not dispatch the update action when id is not present', () => {
        // Render the component without an id in the URL params
        render(
            <Provider store={store}>
                <Router>
                    <AttendanceForm />
                </Router>
            </Provider>
        );

        const saveButton = screen.getByText(/Save/);
        userEvent.click(saveButton);

        // Ensure that no update action is dispatched without an id
        expect(updateAttendanceById).not.toHaveBeenCalled();
    });
});
