'use strict';
const fs = require('fs');
const path = require ('path');

const normalTemplate = fs.readdirSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');

const renderTemp = function (context) {
  return new Promise((resolve) => {
    resolve(accountHTML.replace(
      '<div id=app></div>',
      '<div id=app></div>'
    ));
  });
};
const source = [path.resolve (__dirname, 'dist'), path.resolve(__dirname, 'static')];
module.exports = {
  renderTemp,
  source
}