const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();


function handleSearch(queries, model, session, callBack) {
  searchWhere = {where: {[session.Sequelize.Op.or]: {}}}

  for (var key in queries) {
    searchWhere['where'][session.Sequelize.Op.or][key] = {
        [session.Sequelize.Op.like]: '%' + queries[key] + '%'
    };
  }

  model.findAll(searchWhere)
  .then(results => {
    callBack(results);
  });
};

function rename(obj, a, b) {
  obj[b] = obj[a];
  delete obj[a];
}

function aggAndRemove(obj, a, b) {
  obj[a] = obj[a].concat(obj[b]);
  delete obj[b];
}

function timeCompare(a, b) {
  return Date.parse(a['updatedAt']) - Date.parse(b['updatedAt']);
}

function mostRecentN(obj, key, N) {
  let n = 0;
  obj[key].sort(timeCompare).filter(item => {
    n <=N;
  })
}

module.exports = { handleSearch, rename, aggAndRemove, mostRecentN};
