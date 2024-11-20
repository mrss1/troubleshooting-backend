const knex = require('knex');
const knexConfig = require('./knexfile'); // Import your knexfile.js configuration

const db = knex(knexConfig);

module.exports = db;
