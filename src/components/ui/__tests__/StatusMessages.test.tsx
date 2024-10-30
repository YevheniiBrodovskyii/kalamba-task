import { render, screen } from "@testing-library/react";
import { toast } from 'react-toastify';
import { Loading, showErrorNotification, NoDataFoundMessage, SuccessMessage, showSuccessNotification } from "../StatusMessages";

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn()
    },
}));

describe("Status messages", () => {

    test("render Loading Component", () => {

        render(<Loading />);

        expect(screen.getByText('Please wait')).toBeInTheDocument();
    });

    test('should call showErrorNotification with correct parameters', () => {
        const errorMessage = 'This is an error message';

        showErrorNotification(errorMessage);

        expect(toast.error).toHaveBeenCalledWith(
            <div className="error-notification">{errorMessage}</div>,
            {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
            }
        );
    });

    test("render NoDataFoundMessage Component", () => {

        render(<NoDataFoundMessage />);

        expect(screen.getByText('No data found')).toBeInTheDocument();
    });

    test("render SuccessMessage Component", () => {

        render(<SuccessMessage username="user" show />);

        expect(screen.getByText('Login successful! Welcome, user!')).toBeInTheDocument();
    });

    test('should call showSuccessNotification with correct parameters', () => {
        const successMessage = 'This is an success message';

        showSuccessNotification(successMessage);

        expect(toast.success).toHaveBeenCalledWith(
            <div className="success-notification">{successMessage}</div>,
            {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
            }
        );
    });
});