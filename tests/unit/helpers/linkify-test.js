import {
  linkify
} from 'ember-linkify/helpers/linkify';
import { module, test } from 'qunit';

module('Unit | Helper | linkify');

test('it should turn a url into a link', function(assert) {
  var result = linkify(['My link: http://google.com']).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com">http://google.com</a>');
});

test('it should turn a ip address into a link', function(assert) {
  var result = linkify(['My link: https://62.123.123.123/test and some more text']).toString().trim();
  assert.equal(result, 'My link: <a href="https://62.123.123.123/test">https://62.123.123.123/test</a> and some more text');
});

test('it should turn a url with www. into a link', function(assert) {
  var result = linkify(['www.johnotander.com']).toString().trim();
  assert.equal(result, '<a href="//www.johnotander.com">www.johnotander.com</a>');
});

test('it should escape html', function(assert) {
  var result = linkify(['<h1>Some Html</h1>']).toString().trim();
  assert.equal(result, '&lt;h1&gt;Some Html&lt;/h1&gt;');
});

test('it should not allow script tags because bad', function(assert) {
  var result = linkify(['<script>alert("oh noes!");</script>']).toString().trim();
  assert.equal(result, '&lt;script&gt;alert(&quot;oh noes!&quot;);&lt;/script&gt;');
});

test('it should not link other attempted bad urls', function(assert) {
  var result = linkify(['http://javascript:alert(1)']).toString().trim();
  assert.equal(result, 'http://javascript:alert(1)');
});

test('it should shorten a url by specified url length and adds 3 dots to the end', function(assert) {
  var options = {
    urlLength : 10
  };
  var result = linkify(["http://emberjs.com/"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/">http://emb...</a>' );
});

test('it should shorten a url by specified url length and adds 3 dots to the end in long url only', function(assert) {
  const longUrl  = 'https://guides.emberjs.com/v2.5.0/templates/writing-helpers/';
  const shortUrl = 'http://emberjs.com/';
  const options  = {
    urlLength : 20
  };
  const resultLongUrl = linkify([longUrl] , options ).toString().trim();
  assert.equal(resultLongUrl , '<a href="https://guides.emberjs.com/v2.5.0/templates/writing-helpers/">https://guides.ember...</a>' );

  const resultShortUrl = linkify([shortUrl] , options ).toString().trim();
  assert.equal(resultShortUrl, '<a href="http://emberjs.com/">http://emberjs.com/</a>' );
});

test('it should use the default scheme when no scheme is specified', function(assert) {
  const string = 'This link is missing a scheme: www.foo.com';
  const options = { defaultScheme: 'http' };
  const result = linkify([string], options).toString().trim();
  assert.equal(result, 'This link is missing a scheme: <a href="http://www.foo.com">www.foo.com</a>');
});

test('default scheme should not override an existing scheme', function(assert) {
  const string = 'This link already has a scheme: https://www.foo.com';
  const options = { defaultScheme: 'http' };
  const result = linkify([string], options).toString().trim();
  assert.equal(result, 'This link already has a scheme: <a href="https://www.foo.com">https://www.foo.com</a>');
});

test('it should turn a url into a link with a target of "_blank"', function(assert) {
  var options = {
    target : '_blank'
  };
  var result = linkify(["My link: http://google.com"], options ).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com" target="_blank">http://google.com</a>');
});

test('it should turn a url into a link with a rel of "noopener"', function(assert) {
  var options = {
    rel : 'noopener'
  };
  var result = linkify(["http://emberjs.com/"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" rel="noopener">http://emberjs.com/</a>' );
});

test('it should turn a url into a link with a class of "amilkey"', function(assert) {
  var options = {
    class : 'amilkey'
  };
  var result = linkify(["http://emberjs.com/"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" class="amilkey">http://emberjs.com/</a>' );
});

test('it should turn a url into a link with a rel of "noopener", a class of "amilkey" and a target of "_blank"', function(assert) {
  var options = {
    rel   : 'noopener',
    class : 'amilkey',
    target: '_blank'
  };
  var result = linkify(["http://emberjs.com/"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" rel="noopener" class="amilkey" target="_blank">http://emberjs.com/</a>' );
});

test('it should turn a space delimited list of urls into seperate links', function(assert) {
  var result = linkify(['My link: http://google.com http://bing.com www.altavista.com']).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com">http://google.com</a> <a href="http://bing.com">http://bing.com</a> <a href="//www.altavista.com">www.altavista.com</a>');
});

test('it should properly handle fragments without leading slashes', function(assert) {
  var result = linkify(['My link: http://some.website.com#fragment']).toString().trim();
  assert.equal(result, 'My link: <a href="http://some.website.com#fragment">http://some.website.com#fragment</a>');
});
