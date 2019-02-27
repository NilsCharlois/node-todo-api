var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};

// 3 environments
// test
// dev
// production

process.env.NODE_ENV === 'production'
