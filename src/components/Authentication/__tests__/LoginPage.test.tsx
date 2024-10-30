import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { LoginPage } from '../LoginPage';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('LoginPage', () => {
    let mockLogin: jest.Mock;
    const mockNavigate = jest.fn();

    beforeEach(() => {
        mockLogin = jest.fn().mockResolvedValue({ username: 'testuser', token: 'testtoken' });

        //Rewriting to not require variant cause an error / can be fixed but require investigation
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        jest.spyOn(require('contexts/AuthContext'), 'useAuth').mockReturnValue({
            user: null,
            login: mockLogin,
            loading: false,
            logout: jest.fn(),
            getCurrentUser: jest.fn(),
        });

        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders LoginPage correctly', () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <LoginPage />
                </AuthProvider>
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Do not have an account\? Sign up/i)).toBeInTheDocument();
    });

    test('calls login on form submission', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <LoginPage />
                </AuthProvider>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    test('redirects after successful login', async () => {
        
        //Rewriting to not require variant cause an error / can be fixed but require investigation
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        jest.spyOn(require('contexts/AuthContext'), 'useAuth').mockReturnValue({
            user: { username: 'testuser' },
        });

        render(
            <MemoryRouter>
                 <AuthProvider>
                       <LoginPage />
                </AuthProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Login successful! Welcome, testuser!')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        }, {timeout: 3000});
    });
});
