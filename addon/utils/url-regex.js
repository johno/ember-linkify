import Ember from 'ember';

// URL regex courtesy of https://github.com/kevva/url-regex
function urlRegex () {
  return /(["'])?(?:(?:(?:(?:https?|ftp|\w):)?\/\/)|(?:www.))(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:1\d\d|2[0-4]\d|25[0-4]|[1-9]\d?))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?\1/ig;
}

// Shortens the URL and adds three dots to the end
function shortenUrl ( url , length ) {

  if( !Ember.isBlank( url ) && url.length > length) {
      url = url.substr( 0 , length ) + "...";
  }

  return url;
}

// Builds a regex with the escapes for a given delimiter
function delimiterBuilder (delimiter) {

	let urlHeadPattern = /(["'])?(?:(?:(?:(?:https?|ftp|\w):)?\/\/)|(?:www.))(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:1\d\d|2[0-4]\d|25[0-4]|[1-9]\d?))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?/ig,
		urlTailPattern = /[a-z0-9\-._~:/?#%[\]@!$&'()*+;=`,"]/;

	urlTailPattern = new RegExp(urlTailPattern.source.replace(delimiter,""),"ig");
	
	return new RegExp(`${urlHeadPattern.source}(?:\/${urlTailPattern.source}*)?\\1`, "ig");
}

export { urlRegex, shortenUrl, delimiterBuilder };