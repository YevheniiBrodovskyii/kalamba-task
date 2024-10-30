import { render, screen, waitFor } from '@testing-library/react';
import { ArticlePreview } from '../ArticlePreview';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { setupMocks } from '__mocks__/setupMocks';

const articleMock = {
    author: {
        bio: "Test bio",
        following: false,
        image: "",
        username: "Test username",
        token: "test-token"
    },
    body: "Test body",
    createdAt: "2021-04-08T00:00:00.000Z",
    description: "Test description",
    favorited: false,
    favoritesCount: 1,
    slug: "Test slug",
    tagList: [
        "Test tag"
    ],
    title: "Test title",
    updatedAt: "2024-10-24T23:37:12.423Z",
};

describe('ArticlePreview Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupMocks();
    });
    test('render ArticlePreview Component', async () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <ArticlePreview  article={articleMock}/>
                </BrowserRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Read more...')).toBeInTheDocument();
        });
    });
});
