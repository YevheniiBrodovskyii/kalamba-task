import { useArticles, useArticle, useProfile, useFavoritePost, useFollowUser, useActionHandler } from 'hooks';

export const setupMocks = () => {
    (useArticles as jest.Mock).mockReturnValue({
        articles: [
            {
                author: {
                    bio: "Test bio",
                    following: false,
                    image: "",
                    username: "Test username"
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
                updatedAt: "2024-10-24T23:37:12.423Z"
            },


        ],
        loading: false,
    });
    (useArticle as jest.Mock).mockReturnValue({
        article: {
            author: {
                bio: "Test bio",
                following: false,
                image: "",
                username: "Test username"
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
            updatedAt: "2024-10-24T23:37:12.423Z"
        },
        loading: false,
    });
    (useProfile as jest.Mock).mockReturnValue({
        profile: {
            bio: "Test bio",
            following: false,
            image: "",
            username: "Test username"
        },
        loading: false,
    });
    (useFavoritePost as jest.Mock).mockReturnValue({
        toggleFavorite: jest.fn(),
        isFavorited: false,
        favoritesCount: 0,
        isLoading: false,
    });

    (useFollowUser as jest.Mock).mockReturnValue({
        toggleFollow: jest.fn(),
        isFollowing: false,
        isLoading: false,
    });

    (useActionHandler as jest.Mock).mockReturnValue({
        handleActionClick: jest.fn(),
    });
};


export const mockProfileNotFound = () => {
    (useProfile as jest.Mock).mockReturnValue({
        profile: null,
        loading: false,
    });
};