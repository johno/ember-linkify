import Ember from 'ember';

export function linkify(textToLinkify) {
  textToLinkify = Ember.Handlebars.Utils.escapeExpression(textToLinkify);

  // URL regex courtesy of https://github.com/kevva/url-regex
  textToLinkify = textToLinkify.replace(/(?:^|\s)(["'])?(?:(?:(?:(?:https?|ftp|\w):)?\/\/)|(?:www.))(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?\1/ig, function (s) {
    return ' <a href="' + s.trim() + '">' + s.trim() + '</a> ';
  });

  return new Ember.Handlebars.SafeString(textToLinkify);
}

export default Ember.Handlebars.makeBoundHelper(linkify);
