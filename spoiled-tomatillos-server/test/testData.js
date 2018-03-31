const bcrypt = require('bcrypt');
const now = new Date();

module.exports = {
  timestamp: now,
  users: [
    {
      id: 1,
      username: 'test_user1',
      email: 'test_user1@test.com',
      password: bcrypt.hashSync('test', 10),
      firstName: 'Bilbo',
      lastName: 'Baggins',
      bio: 'Basic Test User #1',
      profileImageUrl: 'www.google.com',
      isAdmin: false,
      createdAt: now,
      updatedAt: now
    },
    {
      id: 2,
      username: 'test_user2',
      email: 'test_user2@test.com',
      password: bcrypt.hashSync('test', 10),
      firstName: 'Jane',
      lastName: 'Doe',
      bio: 'Basic Test User #2',
      profileImageUrl: 'www.google.com',
      isAdmin: false,
      createdAt: now,
      updatedAt: now
    },
    {
      id: 3,
      username: 'test_admin',
      email: 'test_admin@test.com',
      password: bcrypt.hashSync('test', 10),
      firstName: 'Ed',
      lastName: 'Ministrator',
      bio: '',
      profileImageUrl: 'www.google.com',
      isAdmin: true,
      createdAt: now,
      updatedAt: now
    }
  ],

  movies: [
    {
      id: 1,
      imdbId: 114709,
      tmdbId: 862,
      title: 'Toy Story (1995)',
      createdAt: now,
      updatedAt: now
    }, {
      id: 2,
      imdbId: 113497,
      tmdbId: 8844,
      title: 'Jumanji (1995)',
      createdAt: now,
      updatedAt: now
    }, {
      id: 3,
      imdbId: 114057,
      tmdbId: 16420,
      title: 'Othello (1995)',
      createdAt: now,
      updatedAt: now
    }, {
      id: 4,
      imdbId: 110357,
      tmdbId: 8587,
      title: 'Lion King, The (1994)',
      createdAt: now,
      updatedAt: now
    }
  ],

  genres: [
    {
      id: 1,
      genre: 'Children\'s',
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      id: 2,
      genre: 'Action',
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      id: 3,
      genre: 'Action',
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }, {
      id: 4,
      genre: 'Adventure',
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }, {
      id: 5,
      genre: 'Drama',
      movieId: 3,
      createdAt: now,
      updatedAt: now
    }, {
      id: 6,
      genre: 'Children\'s',
      movieId: 4,
      createdAt: now,
      updatedAt: now
    }
  ],

  reviews: [
    {
      id: 1,
      text: 'Love this movie',
      rating: 4.5,
      userId: 1,
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      id: 2,
      text: 'Hate this movie',
      rating: 1,
      userId: 1,
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }, {
      id: 3,
      text: 'Meh',
      rating: 3,
      userId: 2,
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      id: 4,
      text: 'This is a review',
      rating: 2.5,
      userId: 3,
      movieId: 3,
      createdAt: now,
      updatedAt: now
    }, {
      id: 5,
      text: 'This is another review',
      rating: 1.5,
      userId: 3,
      movieId: 4,
      createdAt: now,
      updatedAt: now
    }
  ],

  // TODO: Review comments

  recommendations: [
    {
      id: 1,
      message: 'I heard you like kids movies',
      recommenderId: 2,
      recommendeeId: 1,
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      id: 2,
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
      id: 1,
      link: 'www.google.com',
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      id: 2,
      link: 'www.imdb.com',
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }
  ],

  blockedUsers: [
    {
      id: 1,
      blockerId: 2,
      blockeeId: 3,
      createdAt: now,
      updatedAt: now
    }
  ],

  affiliateCodes: [
    {
      id: 1,
      code: 'ABCXYZ',
      provider: 'Fandango',
      movieId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      id: 2,
      code: 'CODEYCODE',
      provider: 'Groupon',
      movieId: 2,
      createdAt: now,
      updatedAt: now
    }
  ],

  followers: [
    {
      id: 1,
      followerId: 2,
      followeeId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      id: 2,
      followerId: 3,
      followeeId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      id: 3,
      followerId: 1,
      followeeId: 2,
      createdAt: now,
      updatedAt: now
    }
  ],

  // TODO
  watchlist: []
};
