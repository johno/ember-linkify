import Ember from 'ember';
import urlRegex from 'ember-linkify/utils/url-regex';

export function linkify(textToLinkify, windowTarget) {
  windowTarget = windowTarget || "_self";
  textToLinkify = Ember.Handlebars.Utils.escapeExpression(textToLinkify);

  textToLinkify = textToLinkify.replace(urlRegex(), function (s) {
    var url;
    if(s.trim().match(/^www\./ig)) {
      url = '//' + s.trim();
    } else {
      url = s.trim();
    }
    return ' <a href="' + url + '" target="'+windowTarget+'">' + s.trim() + '</a> ';
  });

  return Ember.String.htmlSafe(textToLinkify);
}

export default Ember.Helper.helper(linkify);
