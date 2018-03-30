const bcrypt = require('bcrypt');
const now = new Date();

module.exports = {
  timestamp: now,
  users: [
    {
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
      imdbId: 114709,
      tmdbId: 862,
      title: "Toy Story (1995)",
      createdAt: now,
      updatedAt: now
    }, {
      imdbId: 113497,
      tmdbId: 8844,
      title: "Jumanji (1995)",
      createdAt: now,
      updatedAt: now
    }, {
      imdbId: 114057,
      tmdbId: 16420,
      title: "Othello (1995)",
      createdAt: now,
      updatedAt: now
    }, {
      imdbId: 110357,
      tmdbId: 8587,
      title: "Lion King, The (1994)",
      createdAt: now,
      updatedAt: now
    }
  ],

  genres: [
    {
      genre: 'Children\'s',
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Action',
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Action',
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Adventure',
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Drama',
      movieId: 3,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Children\'s',
      movieId: 4,
      createdAt: now,
      updatedAt: now
    }
  ],

  reviews: [
    {
      text: 'Love this movie',
      rating: 4.5,
      userId: 1,
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'Hate this movie',
      rating: 1,
      userId: 1,
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'Meh',
      rating: 3,
      userId: 2,
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'This is a review',
      rating: 2.5,
      userId: 3,
      movieId: 3,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'This is another review',
      rating: 1.5,
      userId: 3,
      movieId: 4,
      createdAt: now,
      updatedAt: now
    }
  ],

  recommendations: [
    {
      message: 'I heard you like kids movies',
      recommenderId: 2,
      recommendeeId: 1,
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      message: 'Here is another recommendation I guess',
      recommenderId: 3,
      recommendeeId: 1,
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }
  ],

  distributionLinks: [
    {
      link: 'www.google.com',
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      link: 'www.imdb.com',
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }
  ],

  blockedUsers: [
    {
      blockerId: 2,
      blockeeId: 3,
      createdAt: now,
      updatedAt: now
    }
  ],

  affiliateCodes: [
    {
      code: 'ABCXYZ',
      provider: 'Fandango',
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      code: 'CODEYCODE',
      provider: 'Groupon',
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }
  ],

  followers: [
    {
      followerId: 2,
      followeeId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      followerId: 3,
      followeeId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      followerId: 1,
      followeeId: 2,
      createdAt: now,
      updatedAt: now
    }
  ],

  // TODO
  watchlist: []
};
