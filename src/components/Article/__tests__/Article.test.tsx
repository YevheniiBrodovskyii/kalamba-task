import { render, screen, waitFor } from '@testing-library/react';
import { Article } from '../Article';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { setupMocks } from '__mocks__/setupMocks';

jest.mock('hooks');

describe('Article Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupMocks();
    });
    test('render Article Component', async () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Article />
                </BrowserRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Test body')).toBeInTheDocument();
        });
    });
});
