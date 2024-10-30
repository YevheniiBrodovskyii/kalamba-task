import { render, screen, waitFor } from '@testing-library/react';
import { ArticleList } from '../ArticleList';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { setupMocks } from '__mocks__/setupMocks';


describe('ArticleList Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupMocks();
    });
    test('render ArticleList Component', async () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <ArticleList />
                </BrowserRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Test title')).toBeInTheDocument();
        });
    });
});
