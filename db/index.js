const { Client } = require('pg');
const postgresUrl = 'postgres://localhost/wizardstuff';

const client = new Client(postgresUrl);

client.connect();

// client.query()


module.exports = client;