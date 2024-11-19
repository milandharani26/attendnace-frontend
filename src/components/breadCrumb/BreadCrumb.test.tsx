// BreadCrumbs.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BreadCrumbs from './BreadCrumb';

describe('BreadCrumbs Component', () => {
    const breadCrumbsArr = [
        { title: 'Home', link: null },
        { title: 'Section', link: '/section' },
        { title: 'Subsection', link: '/section/subsection' }
    ];

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
            </BrowserRouter>
        );

    test('renders the first breadcrumb without a link', () => {
        screen.debug()
        renderComponent();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Home').closest('a')).toBeNull();
    });

    test('renders breadcrumb links correctly', () => {
        renderComponent();

        const sectionLink = screen.getByText('Section');
        expect(sectionLink).toBeInTheDocument();
        expect(sectionLink.closest('a')).toHaveAttribute('href', '/section');

        const subsectionLink = screen.getByText('Subsection');
        expect(subsectionLink).toBeInTheDocument();
        expect(subsectionLink.closest('a')).toHaveAttribute('href', '/section/subsection');
    });

    test('renders the slashes between breadcrumbs', () => {
        renderComponent();

        // Calculate the expected number of slashes dynamically
        const expectedSlashCount = breadCrumbsArr.length - 2;
        const slashes = screen.getAllByText('/');

        expect(slashes.length).toBe(expectedSlashCount);
    });


    test('does not render slashes after the last breadcrumb', () => {
        renderComponent();
        const breadcrumbText = screen.getByText('Subsection');
        const parent = breadcrumbText.parentElement;
        expect(parent?.nextSibling).toBeNull();
    });
});
