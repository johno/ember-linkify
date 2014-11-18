'use strict';

var path = require('path');

module.exports = {
  name: 'ember-linkify',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },
};
