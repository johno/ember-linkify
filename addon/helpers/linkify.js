import Ember from 'ember';
import urlRegex from 'ember-linkify/utils/url-regex';

export function linkify(textToLinkify, windowTarget) {
  windowTarget = windowTarget || "_self";
  textToLinkify = Ember.Handlebars.Utils.escapeExpression(textToLinkify);

  textToLinkify = textToLinkify.replace(urlRegex(), function (s) {
    return ' <a href="' + s.trim() + '" target="'+windowTarget+'">' + s.trim() + '</a> ';
  });

  return new Ember.Handlebars.SafeString(textToLinkify);
}

export default Ember.Handlebars.makeBoundHelper(linkify);
