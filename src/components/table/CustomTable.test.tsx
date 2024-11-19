// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import CustomTable from './CustomTable';
// import { MemoryRouter } from 'react-router-dom';
// import { mockStore } from 'redux-mock-store';

// // Mock Redux store
// const store = mockStore({
//     auth: { user: { userRole: { role_name: 'admin' } } },
// });

// const columns = [
//     { id: 'name', label: 'Name', sortable: true, filterable: true },
//     { id: 'age', label: 'Age', sortable: true, filterable: true },
//     { id: 'action', label: 'Actions' },
// ];

// const data = [
//     { id: 1, name: 'John Doe', age: 30 },
//     { id: 2, name: 'Jane Smith', age: 25 },
//     { id: 3, name: 'Sam Johnson', age: 22 },
// ];

// const baseUrl = '/employees';

// const renderComponent = () => {
//     render(
//         <Provider store={store}>
//             <MemoryRouter>
//                 <CustomTable data={data} columns={columns} baseUrl={baseUrl} tableName="employee" />
//             </MemoryRouter>
//         </Provider>
//     );
// };

// describe('CustomTable', () => {
//     it('renders table headers correctly', () => {
//         renderComponent();
//         expect(screen.getByText('Name')).toBeInTheDocument();
//         expect(screen.getByText('Age')).toBeInTheDocument();
//         expect(screen.getByText('Actions')).toBeInTheDocument();
//     });

//     it('renders table rows with data', () => {
//         renderComponent();
//         expect(screen.getByText('John Doe')).toBeInTheDocument();
//         expect(screen.getByText('Jane Smith')).toBeInTheDocument();
//         expect(screen.getByText('Sam Johnson')).toBeInTheDocument();
//     });

//     it('filters rows based on the filter input', () => {
//         renderComponent();

//         const filterInput = screen.getByPlaceholderText('Name');
//         fireEvent.change(filterInput, { target: { value: 'John' } });

//         expect(screen.getByText('John Doe')).toBeInTheDocument();
//         expect(screen.queryByText('Jane Smith')).toBeNull();
//         expect(screen.queryByText('Sam Johnson')).toBeNull();
//     });

//     it('sorts rows when sorting header is clicked', () => {
//         renderComponent();

//         // Sorting by "Name" column
//         const nameSortButton = screen.getAllByRole('button')[0];
//         fireEvent.click(nameSortButton); // First click for ascending
//         expect(screen.getByText('John Doe')).toBeInTheDocument();

//         fireEvent.click(nameSortButton); // Second click for descending
//         expect(screen.getByText('Sam Johnson')).toBeInTheDocument();
//     });

//     it('opens and closes popover when clicking actions button', () => {
//         renderComponent();

//         const actionsButton = screen.getByRole('button', { name: /more/i });
//         fireEvent.click(actionsButton);

//         // Check if popover content appears
//         expect(screen.getByText('Edit')).toBeInTheDocument();
//         expect(screen.getByText('Delete')).toBeInTheDocument();

//         // Close the popover
//         const closeButton = screen.getByRole('button', { name: /close/i });
//         fireEvent.click(closeButton);

//         // Check if popover content disappears
//         expect(screen.queryByText('Edit')).toBeNull();
//         expect(screen.queryByText('Delete')).toBeNull();
//     });

//     it('handles pagination', () => {
//         renderComponent();

//         const nextPageButton = screen.getByLabelText('Go to next page');
//         fireEvent.click(nextPageButton);

//         // Check if pagination works
//         expect(screen.getByText('Jane Smith')).toBeInTheDocument();
//     });

//     it('calls deleteEmployeeById when delete button is clicked', () => {
//         const mockDelete = jest.fn();
//         store.dispatch = mockDelete;

//         renderComponent();

//         const actionsButton = screen.getByRole('button', { name: /more/i });
//         fireEvent.click(actionsButton);

//         const deleteButton = screen.getByText('Delete');
//         fireEvent.click(deleteButton);

//         expect(mockDelete).toHaveBeenCalledTimes(1);
//     });
// });
