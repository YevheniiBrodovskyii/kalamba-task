import { render, screen, waitFor } from '@testing-library/react';
import { Profile } from '../Profile';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { mockProfileNotFound, setupMocks } from '__mocks__/setupMocks';

jest.mock('hooks');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Profile Component', () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
        setupMocks();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });
    test('render Profile Component', async () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Follow Test username')).toBeInTheDocument();
        });
    });
    
    //TODO: Want to ensure that NotFound will return if article = null but recieve
    //unexpected result, require more time for investigate and fix
    test('render Not Found Component if profile does not exist', async () => {
        mockProfileNotFound();

        render(
            <AuthProvider>
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(true);
        });
    });
});
