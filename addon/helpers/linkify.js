import Ember from 'ember';
import { urlRegex , shortenUrl } from 'ember-linkify/utils/url-regex';

var ALLOWED_ATTRIBUTE_NAMES = [ 'rel' ];

export function linkify( params, options ) {
  
  var textToLinkify = Ember.Handlebars.Utils.escapeExpression(params[0]);
  var windowTarget = params[1] || "_self";
  var sharedAttributes = opts2attrs( options );

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

    return ' <a href="' + url + '" target="' + windowTarget + '"' + sharedAttributes + '>' + displayText + '</a> ';
  });

  return Ember.String.htmlSafe(textToLinkify);
}

export default Ember.Helper.helper(linkify);

function opts2attrs( options ) {
  var stringOfAttributes = '';

  if( typeof options === 'object' ) {
    for( var i = ALLOWED_ATTRIBUTE_NAMES.length - 1, attributeName = ALLOWED_ATTRIBUTE_NAMES[ i ]; i > -1; i-- ) {
      if( attributeName in options ) {
        stringOfAttributes += ' ' + attributeName + '="' + options[ attributeName ] + '"';
      }
    }
  }

  return stringOfAttributes;
}
