import { render, screen, fireEvent } from '@testing-library/react';
import ButtonCustom from './Button';

describe('ButtonCustom Component', () => {

    test('renders children correctly', () => {
        render(<ButtonCustom>Click Me</ButtonCustom>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    test('calls onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<ButtonCustom onClick={handleClick}>Click Me</ButtonCustom>);
        fireEvent.click(screen.getByText('Click Me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('applies the correct type', () => {
        render(<ButtonCustom type="reset">Reset Button</ButtonCustom>);
        expect(screen.getByText('Reset Button')).toHaveAttribute('type', 'reset');
    });

    test('applies custom className', () => {
        render(<ButtonCustom customClassName="my-custom-class">Styled Button</ButtonCustom>);
        expect(screen.getByText('Styled Button')).toHaveClass('my-custom-class');
    });

    test('disables the button when disabled prop is true', () => {
        render(<ButtonCustom disabled={true}>Disabled Button</ButtonCustom>);
        expect(screen.getByText('Disabled Button')).toBeDisabled();
    });

    test('applies variant "contained" by default', () => {
        render(<ButtonCustom>Default Button</ButtonCustom>);
        expect(screen.getByText('Default Button')).toHaveClass('MuiButton-contained');
    });

    test('applies custom styles when variant is set', () => {
        render(<ButtonCustom variant="outlined">Outlined Button</ButtonCustom>);
        expect(screen.getByText('Outlined Button')).toHaveClass('MuiButton-contained');
    });

    test('spreads additional props onto the button element', () => {
        render(<ButtonCustom data-testid="custom-button" aria-label="custom button">Extra Props Button</ButtonCustom>);
        const button = screen.getByText('Extra Props Button');
        expect(button).toHaveAttribute('data-testid', 'custom-button');
        expect(button).toHaveAttribute('aria-label', 'custom button');
    });

});
