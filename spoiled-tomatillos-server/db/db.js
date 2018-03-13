/* All database interaction handled here. */

const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const sequelize = new Sequelize(
  'cs4500_spring2018_fishstein',
  'ofishstein',
  'cs4500db',
  {
    host: 'cs4500-spring2018-fishstein.cxjizgp7es7a.us-west-2.rds.amazonaws.com',
    dialect: 'mysql',
    operatorsAliases,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./model/User.js')(sequelize, Sequelize);
db.movies = require('./model/Movie.js')(sequelize, Sequelize);
db.blocked_users = require('./model/BlockedUser.js')(sequelize, Sequelize);
db.account_links = require('./model/AccountLinks.js')(sequelize, Sequelize);
db.recommendations = require('./model/Recommendation.js')(sequelize, Sequelize);
db.playlists = require('./model/Playlist.js')(sequelize, Sequelize);
db.playlist_comments = require('./model/PlaylistComments.js')(sequelize, Sequelize);
db.playlist_items = require('./model/PlaylistItem.js')(sequelize, Sequelize);

db.reviews = require('./model/Review.js')(sequelize, Sequelize);
db.review_comments = require('./model/ReviewComments.js')(sequelize, Sequelize);
db.distribution_links = require('./model/DistributionLink.js')(sequelize, Sequelize);
db.affiliate_codes = require('./model/AffiliateCode.js')(sequelize, Sequelize);

// Set up movie relationships
db.movies.hasMany(db.distribution_links)
db.movies.hasMany(db.affiliate_codes)
db.movies.hasMany(db.reviews)

// Set up reviews
db.reviews.hasMany(db.review_comments)
db.reviews.belongsTo(db.users)
db.reviews.belongsTo(db.movies)

// Set up Distribution Links
db.distribution_links.belongsTo(db.movies)

// Set up Affiliate Codes
db.affiliate_codes.belongsTo(db.movies)

// Set up users
db.users.hasMany(db.blocked_users)
db.users.hasMany(db.playlists)
db.users.hasMany(db.playlist_comments)
db.users.hasMany(db.review_comments)
db.users.hasMany(db.recommendations)
db.users.hasMany(db.account_links)
db.users.hasMany(db.reviews)

// set up blocked users
db.blocked_users.belongsTo(db.users)

// set up account links
db.account_links.belongsTo(db.users)

// set up recommendations
//db.recommendations.hasOne(db.movies)
//db.recommendations.belongsTo(db.users)


exports.get_session = () => {return db;};
