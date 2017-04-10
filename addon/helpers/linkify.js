import Ember from 'ember';
import { urlRegex , shortenUrl } from 'ember-linkify/utils/url-regex';

const ALLOWED_ATTRIBUTE_NAMES = [ 'rel', 'class' ];

export function linkify( params, options ) {
  let textToLinkify      = Ember.Handlebars.Utils.escapeExpression(params[0]);
  const windowTarget     = params[1] || "_self";
  const sharedAttributes = opts2attrs( options );

  textToLinkify = textToLinkify.replace(urlRegex(), function (s) {
    let url;
    let displayText = s.trim();

    if(s.trim().match(/^www\./ig)) {
      if (options && options.defaultScheme) {
        url = options.defaultScheme + '://' + s.trim();
      } else {
        url = '//' + s.trim();
      }
    } else {
      url = s.trim();
    }

    if( options && options.urlLength &&  options.urlLength > 0 ) {
      displayText = shortenUrl( displayText, options.urlLength );
    }

    return ` <a href="${url}" target="${windowTarget}"${sharedAttributes}>${displayText}</a> `;
  });

  return Ember.String.htmlSafe(textToLinkify);
}

export default Ember.Helper.helper(linkify);

function opts2attrs( options ) {
  const stringOfAttributes = [''];

  if( Ember.typeOf(options) === 'object' ) {
    for (let i = 0; i < ALLOWED_ATTRIBUTE_NAMES.length; i++) {
      const attributeName = ALLOWED_ATTRIBUTE_NAMES[i];
      if( attributeName in options ) {
        stringOfAttributes.push(`${attributeName}="${options[attributeName]}"`);
      }
    }
  }

  return stringOfAttributes.join(' ');
}
