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

module.exports = { handleSearch };
