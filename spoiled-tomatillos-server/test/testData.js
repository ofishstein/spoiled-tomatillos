const bcrypt = require('bcrypt');
const now = new Date();

module.exports = {
    timestamp: now,
    users: [
        {
            id: 101,
            username: "test_user1",
            email: "test_user1@test.com",
            password: bcrypt.hashSync("test", 10),
            firstName: "Bilbo",
            lastName: "Baggins",
            bio: "Basic Test User #1",
            profileImageUrl: "www.google.com",
            isAdmin: false,
            createdAt: now,
            updatedAt: now
        },
        {
            id: 102,
            username: "test_user2",
            email: "test_user2@test.com",
            password: bcrypt.hashSync("test", 10),
            firstName: "Jane",
            lastName: "Doe",
            bio: "Basic Test User #2",
            profileImageUrl: "www.google.com",
            isAdmin: false,
            createdAt: now,
            updatedAt: now
        },
        {
            id: 103,
            username: "test_admin",
            email: "test_admin@test.com",
            password: bcrypt.hashSync("test", 10),
            firstName: "Ed",
            lastName: "Ministrator",
            bio: "",
            profileImageUrl: "www.google.com",
            isAdmin: true,
            createdAt: now,
            updatedAt: now
        }
    ],

    movies: [
        {
            id: 101,
            imdbId: 114709,
            tmdbId: 862,
            title: "Toy Story (1995)",
            createdAt: now,
            updatedAt: now
        }, {
            id: 102,
            imdbId: 113497,
            tmdbId: 8844,
            title: "Jumanji (1995)",
            createdAt: now,
            updatedAt: now
        }, {
            id: 103,
            imdbId: 114057,
            tmdbId: 16420,
            title: "Othello (1995)",
            createdAt: now,
            updatedAt: now
        }, {
            id: 104,
            imdbId: 110357,
            tmdbId: 8587,
            title: "Lion King, The (1994)",
            createdAt: now,
            updatedAt: now
        }
    ],

    genres: [
        {
            id: 101,
            genre: 'Children\'s',
            movieId: 101,
            createdAt: now,
            updatedAt: now
        }, {
            id: 102,
            genre: 'Action',
            movieId: 101,
            createdAt: now,
            updatedAt: now
        }, {
            id: 103,
            genre: 'Action',
            movieId: 102,
            createdAt: now,
            updatedAt: now
        }, {
            id: 104,
            genre: 'Adventure',
            movieId: 102,
            createdAt: now,
            updatedAt: now
        }, {
            id: 105,
            genre: 'Drama',
            movieId: 103,
            createdAt: now,
            updatedAt: now
        }, {
            id: 106,
            genre: 'Children\'s',
            movieId: 104,
            createdAt: now,
            updatedAt: now
        }
    ],

    reviews: [
        {
            id: 101,
            text: 'Love this movie',
            rating: 4.5,
            userId: 101,
            movieId: 101,
            createdAt: now,
            updatedAt: now
        }, {
            id: 102,
            text: 'Hate this movie',
            rating: 1,
            userId: 101,
            movieId: 102,
            createdAt: now,
            updatedAt: now
        }, {
            id: 103,
            text: 'Meh',
            rating: 3,
            userId: 102,
            movieId: 101,
            createdAt: now,
            updatedAt: now
        }, {
            id: 104,
            text: 'This is a review',
            rating: 2.5,
            userId: 103,
            movieId: 103,
            createdAt: now,
            updatedAt: now
        }, {
            id: 105,
            text: 'This is another review',
            rating: 1.5,
            userId: 103,
            movieId: 104,
            createdAt: now,
            updatedAt: now
        }
    ],

    recommendations: [
        {
            id: 101,
            message: 'I heard you like kids movies',
            recommenderId: 102,
            recommendeeId: 101,
            movieId: 101,
            createdAt: now,
            updatedAt: now
        }, {
            id: 102,
            message: 'Here is another recommendation I guess',
            recommenderId: 103,
            recommendeeId: 101,
            movieId: 102,
            createdAt: now,
            updatedAt: now
        }
    ],

    distributionLinks: [
        {
            id: 101,
            link: 'www.google.com',
            movieId: 101,
            createdAt: now,
            updatedAt: now
        }, {
            id: 102,
            link: 'www.imdb.com',
            movieId: 102,
            createdAt: now,
            updatedAt: now
        }
    ],

    blockedUsers: [
        {
            id: 101,
            blockerId: 102,
            blockeeId: 103,
            createdAt: now,
            updatedAt: now
        }
    ],

    affiliateCodes: [
        {
            id: 101,
            code: 'ABCXYZ',
            provider: 'Fandango',
            movieId: 101,
            createdAt: now,
            updatedAt: now
        }, {
            id: 102,
            code: 'CODEYCODE',
            provider: 'Groupon',
            movieId: 102,
            createdAt: now,
            updatedAt: now
        }
    ],

    followers: [
        {
            id: 101,
            followerId: 102,
            followeeId: 101,
            createdAt: now,
            updatedAt: now
        }, {
            id: 102,
            followerId: 103,
            followeeId: 101,
            createdAt: now,
            updatedAt: now
        }, {
            id: 103,
            followerId: 101,
            followeeId: 102,
            createdAt: now,
            updatedAt: now
        }
    ],

    watchlist: [
        {
            id: 101,
            userId: 101,
            movieId: 102
        },
        {
            id: 102,
            userId: 101,
            movieId: 103
        },
        {
            id: 103,
            userId: 101,
            movieId: 104
        },
        {
            id: 104,
            userId: 102,
            movieId: 103
        },
        {
            id: 105,
            userId: 102,
            movieId: 101
        },
    ]
};
