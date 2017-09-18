const routes = module.exports = require('next-routes')();

// universal routes go here
// server-only routes go in server.js
routes
.add('topic', '/topic/:id');
