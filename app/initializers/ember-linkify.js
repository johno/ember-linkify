import Ember from 'ember';
import { linkify } from 'ember-linkify/helpers/linkify';

export var initialize = function(/* container, app */) {
  Ember.Handlebars.helper('linkify', linkify);
};

export default {
  name: 'ember-linkify',
  initialize: initialize
};
