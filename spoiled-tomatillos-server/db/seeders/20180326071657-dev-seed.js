'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tier 1 data (no foreign keys)
    const now = new Date();
    const usersToInsert = [{
      username: "SeedUser1",
      email: "user1@seed.com",
      password: bcrypt.hashSync("su1", 10),
      firstName: "User1",
      lastName: "Seed",
      bio: "Basic Seeded User #1",
      profileImageUrl: "www.google.com",
      isAdmin: false,
      createdAt: now,
      updatedAt: now
    }, {
      username: "SeedUser2",
      email: "user2@seed.com",
      password: bcrypt.hashSync("su2", 10),
      firstName: "User2",
      lastName: "Seed",
      bio: "Basic Seeded User #2",
      profileImageUrl: "www.google.com",
      isAdmin: false,
      createdAt: now,
      updatedAt: now
      },{
      username: "SeedUser3",
      email: "user3@seed.com",
      password: bcrypt.hashSync("su3", 10),
      firstName: "User3",
      lastName: "Seed",
      bio: "Basic Seeded User #3",
      profileImageUrl: "www.google.com",
      isAdmin: false,
      createdAt: now,
      updatedAt: now
    }, {
      username: "AdminSeedUser1",
      email: "adminuser1@seed.com",
      password: bcrypt.hashSync("asu1", 10),
      firstName: "AdminUser1",
      lastName: "Seed",
      bio: "Admin Seeded User #1",
      profileImageUrl: "www.google.com",
      isAdmin: true,
      createdAt: now,
      updatedAt: now
    }];
    const moviesToInsert = [{
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
    }];

    await queryInterface.bulkInsert('Users', usersToInsert, {});
    await queryInterface.bulkInsert('Movies', moviesToInsert, {});

    const seq = queryInterface.sequelize;

    // Get User and movie id's for certain movies
    const users = await seq.query(
      `SELECT id from "Users";`, {
        type: seq.QueryTypes.SELECT
      }
    );
    const regularUsers = users.filter((u) => !u.isAdmin);
    const movies = await seq.query(
      `SELECT id from "Movies";`, {
        type: seq.QueryTypes.SELECT
      });

    // Tier 2 data (tier 1 foreign keys)
    const genresToInsert = [{
      genre: 'Children\'s',
      movieId: movies[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Action',
      movieId: movies[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Action',
      movieId: movies[1].id,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Adventure',
      movieId: movies[1].id,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Drama',
      movieId: movies[2].id,
      createdAt: now,
      updatedAt: now
    }, {
      genre: 'Children\'s',
      movieId: movies[3].id,
      createdAt: now,
      updatedAt: now
    }];
    const reviewsToInsert = [{
      text: 'Love this movie',
      rating: 4.5,
      userId: regularUsers[0].id,
      movieId: movies[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'Hate this movie',
      rating: 1,
      userId: regularUsers[0].id,
      movieId: movies[1].id,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'Meh',
      rating: 3,
      userId: regularUsers[1].id,
      movieId: movies[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'This is a review',
      rating: 2.5,
      userId: regularUsers[2].id,
      movieId: movies[2].id,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'This is another review',
      rating: 1.5,
      userId: regularUsers[2].id,
      movieId: movies[3].id,
      createdAt: now,
      updatedAt: now
    }];
    const recommendationsToInsert = [{
      message: 'I heard you like kids movies',
      recommenderId: regularUsers[1].id,
      recommendeeId: regularUsers[0].id,
      movieId: movies[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      message: 'Here is another recommendation I guess',
      recommenderId: regularUsers[2].id,
      recommendeeId: regularUsers[0].id,
      movieId: movies[1].id,
      createdAt: now,
      updatedAt: now
    }];
    const distributionLinksToInsert = [{
      link: 'www.google.com',
      movieId: movies[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      link: 'www.imdb.com',
      movieId: movies[1].id,
      createdAt: now,
      updatedAt: now
    }];
    const blockedUsersToInsert = [{
      blockerId: regularUsers[1].id,
      blockeeId: regularUsers[2].id,
      createdAt: now,
      updatedAt: now
    }];
    const affiliateCodesToInsert = [{
      code: 'ABCXYZ',
      provider: 'Fandango',
      movieId: movies[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      code: 'CODEYCODE',
      provider: 'Groupon',
      movieId: movies[1].id,
      createdAt: now,
      updatedAt: now
    }];
    const followersToInsert = [{
      followerId: regularUsers[1].id,
      followeeId: regularUsers[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      followerId: regularUsers[2].id,
      followeeId: regularUsers[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      followerId: regularUsers[0].id,
      followeeId: regularUsers[1].id,
      createdAt: now,
      updatedAt: now
    }];

    await queryInterface.bulkInsert('Genres', genresToInsert, {});
    await queryInterface.bulkInsert('Reviews', reviewsToInsert, {});
    await queryInterface.bulkInsert('Recommendations', recommendationsToInsert, {});
    await queryInterface.bulkInsert('DistributionLinks', distributionLinksToInsert, {});
    await queryInterface.bulkInsert('BlockedUsers', blockedUsersToInsert, {});
    await queryInterface.bulkInsert('AffiliateCodes', affiliateCodesToInsert, {});
    await queryInterface.bulkInsert('Followers', followersToInsert, {});

    const reviews = await seq.query(
      `SELECT id from "Reviews";`, {
        type: seq.QueryTypes.SELECT
      }
    );

    const reviewCommentsToInsert = [{
      text: 'This is a silly review',
      commenterId: regularUsers[1].id,
      reviewId: reviews[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'This is a good review',
      commenterId: regularUsers[1].id,
      reviewId: reviews[1].id,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'Idk I need to make a comment on a review',
      commenterId: regularUsers[0].id,
      reviewId: reviews[3].id,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'I also need to make a comment on a review',
      commenterId: regularUsers[2].id,
      reviewId: reviews[4].id,
      createdAt: now,
      updatedAt: now
    }];
    const watchlistCommentsToInsert = [{
      text: 'This is a watchlist comment',
      commenterId: regularUsers[0].id,
      ownerId: regularUsers[1].id,
      createdAt: now,
      updatedAt: now
    }, {
      text: 'This is another watchlist comment',
      commenterId: regularUsers[1].id,
      ownerId: watchlists[2].id,
      createdAt: now,
      updatedAt: now
    }];
    const watchlistItemsToInsert = [{
      userId: regularUsers[0].id,
      movieId: movies[0].id,
      createdAt: now,
      updatedAt: now
    }, {
      userId: regularUsers[0].id,
      movieId: movies[3].id,
      createdAt: now,
      updatedAt: now
    }, {
      userId: regularUsers[1].id,
      movieId: movies[2].id,
      createdAt: now,
      updatedAt: now
    }, {
      userId: regularUsers[2].id,
      movieId: movies[2].id,
      createdAt: now,
      updatedAt: now
    }, {
      userId: regularUsers[0].id,
      movieId: movies[2].id,
      createdAt: now,
      updatedAt: now
    }, {
      userId: regularUsers[1].id,
      movieId: movies[1].id,
      createdAt: now,
      updatedAt: now
    }];

    await queryInterface.bulkInsert('ReviewComments', reviewCommentsToInsert, {});
    await queryInterface.bulkInsert('WatchlistComments', watchlistCommentsToInsert, {});
    return await queryInterface.bulkInsert('WatchlistItems', watchlistItemsToInsert, {});
  },

  down: async function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
