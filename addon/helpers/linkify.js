import Ember from 'ember';
import { urlRegex , shortenUrl } from 'ember-linkify/utils/url-regex';

export function linkify( params, options ) {
  
  var textToLinkify = Ember.Handlebars.Utils.escapeExpression(params[0]);
  var windowTarget = params[1] || "_self";

  textToLinkify = textToLinkify.replace(urlRegex(), function (s) {
    var url;
    var displayText = s.trim();

    if(s.trim().match(/^www\./ig)) {
      url = '//' + s.trim();
    } else {
      url = s.trim();
    }

    if( options && options.urlLength &&  options.urlLength > 0 ) {
      displayText = shortenUrl( displayText, options.urlLength ); 
    } 

    return ' <a href="' + url + '" target="' + windowTarget + '">' + displayText + '</a> ';
  });

  return Ember.String.htmlSafe(textToLinkify);
}

export default Ember.Helper.helper(linkify);
