'use strict';

const fs = require('fs');

/**
 * ViewsHandlebars.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  readTemplate: (path, opts = 'utf8') => {
    new Promise((res, rej) => {
      fs.readFile(path, opts, (err, data) => {
        if (err) rej(err);
        console.log(data);
        res(data);
      });
    });
  },
  writeTemplate: (path, content) => {
    new Promise((res, rej) => {
      fs.writeFile(path, content, 'utf8', (err) => {
        if (err) rej(err);
        res();
      });
    });
  },
};
