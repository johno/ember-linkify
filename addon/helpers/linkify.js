import { typeOf } from '@ember/utils';
import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import Ember from 'ember';
import { urlRegex , shortenUrl } from 'ember-linkify/utils/url-regex';

const ALLOWED_ATTRIBUTE_NAMES = [ 'rel', 'class' ];

export function linkify( params, options ) {
  let textToLinkifyOriginal = params[0];
  const windowTarget        = params[1] || "_self";
  const sharedAttributes    = opts2attrs( options );

  let textToLinkify = textToLinkifyOriginal.replace(urlRegex(), function (s) {
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

    // make the url and display text html friendly
    url = Ember.Handlebars.Utils.escapeExpression(url);
    displayText = Ember.Handlebars.Utils.escapeExpression(displayText)

    return `<a href="${url}" target="${windowTarget}"${sharedAttributes}>${displayText}</a>`;
  });

  // if no urls were found, then we escape the entire input, this prevents things like <script> from being
  // injected
  if (textToLinkifyOriginal === textToLinkify) {
    textToLinkify = Ember.Handlebars.Utils.escapeExpression(textToLinkifyOriginal);
  }

  return htmlSafe(textToLinkify);
}

export default helper(linkify);

function opts2attrs( options ) {
  const stringOfAttributes = [''];

  if( typeOf(options) === 'object' ) {
    for (let i = 0; i < ALLOWED_ATTRIBUTE_NAMES.length; i++) {
      const attributeName = ALLOWED_ATTRIBUTE_NAMES[i];
      if( attributeName in options ) {
        stringOfAttributes.push(`${attributeName}="${options[attributeName]}"`);
      }
    }
  }

  return stringOfAttributes.join(' ');
}
