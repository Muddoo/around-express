const fs = require('fs').promises;

module.exports = (path) =>
          fs.readFile(path, {encoding: 'utf8'})
            .then(JSON.parse)
            .catch(err => console.log(err));