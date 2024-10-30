import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { showErrorNotification } from 'components';

jest.mock('components', () => ({
    showErrorNotification: jest.fn(),
}));

global.fetch = jest.fn();

const TestComponent = () => {
    const { user, loading, login, logout, getCurrentUser } = useAuth();
    return (
        <div>
            {loading && <span>Loading...</span>}
            {user ? <span>{`Logged in as ${user.username}`}</span> : <span>Not logged in</span>}
            <button onClick={() => login('test@example.com', 'password')}>Login</button>
            <button onClick={logout}>Logout</button>
            <button onClick={getCurrentUser}>Get Current User</button>
        </div>
    );
};

describe('AuthProvider', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders children and provides context', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByText('Not logged in')).toBeInTheDocument();
    });

    test('logs in the user and updates context', async () => {
        const mockUser = { username: 'TestUser', token: 'mockToken' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ user: mockUser }),
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        screen.getByText('Login').click();

        await waitFor(() => {
            expect(screen.getByText('Logged in as TestUser')).toBeInTheDocument();
            expect(localStorage.getItem('jwtToken')).toBe(mockUser.token);
        });
    });

    test('handles unknown error gracefully', async () => {
        const unknownError = 'This is an unknown error';

        (global.fetch as jest.Mock).mockImplementationOnce(() => {
            throw unknownError;
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        screen.getByText('Login').click();

        await waitFor(() => {
            expect(showErrorNotification).toHaveBeenCalledWith('An unknown error occurred');
        });
    });

    test('logs out the user and resets context', async () => {
        const mockUser = { username: 'TestUser', token: 'mockToken' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ user: mockUser }),
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        screen.getByText('Login').click();
        await waitFor(() => expect(screen.getByText('Logged in as TestUser')).toBeInTheDocument());

        screen.getByText('Logout').click();

        await waitFor(() => {
            expect(screen.getByText('Not logged in')).toBeInTheDocument();
            expect(localStorage.getItem('jwtToken')).toBeNull();
        });
    });

    test('fetches the current user if token exists', async () => {
        const mockUser = { username: 'TestUser', token: 'mockToken' };
        localStorage.setItem('jwtToken', mockUser.token);

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ user: mockUser }),
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Logged in as TestUser')).toBeInTheDocument();
        });
    });

    test('handles error when fetching current user', async () => {
        const mockUser = { username: 'TestUser', token: 'mockToken' };
        localStorage.setItem('jwtToken', mockUser.token);

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: jest.fn().mockResolvedValueOnce({ message: 'User not found' }),
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(showErrorNotification).toHaveBeenCalledWith('User not found: Incorrect email or password');
        });
    });
});
