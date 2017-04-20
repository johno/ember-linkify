import {
  linkify
} from 'ember-linkify/helpers/linkify';
import { module, test } from 'qunit';

module('Unit | Helper | linkify');

test('it should turn a url into a link', function(assert) {
  var result = linkify(['My link: http://google.com']).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com" target="_self">http://google.com</a>');
});

test('it should turn a ip address into a link', function(assert) {
  var result = linkify(['My link: https://62.123.123.123/test and some more text']).toString().trim();
  assert.equal(result, 'My link: <a href="https://62.123.123.123/test" target="_self">https://62.123.123.123/test</a> and some more text');
});

test('it should turn a url with multiple slashes into a link', function(assert) {
  var result = linkify(['My link: http://google.com/my/name//is///slimshady and some more text']).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com/my/name//is///slimshady" target="_self">http://google.com/my/name//is///slimshady</a> and some more text');
});

test('it should turn a url with encoded characters into a link', function(assert) {
  var result = linkify(['My link: https://www.google.ca/maps/search/oops%2Bi%2Bdid%2Bit%2Bagain/ and some more text']).toString().trim();
  assert.equal(result, 'My link: <a href="https://www.google.ca/maps/search/oops%2Bi%2Bdid%2Bit%2Bagain/" target="_self">https://www.google.ca/maps/search/oops%2Bi%2Bdid%2Bit%2Bagain/</a> and some more text');
});

test('it should turn a url with www. into a link', function(assert) {
  var result = linkify(['www.johnotander.com']).toString().trim();
  assert.equal(result, '<a href="//www.johnotander.com" target="_self">www.johnotander.com</a>');
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

test('it should turn a url into a link with a target of "_blank"', function(assert) {
  var result = linkify(["My link: http://google.com", "_blank"]).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com" target="_blank">http://google.com</a>');
});

test('it should shorten a url by specified url length and adds 3 dots to the end', function(assert) {
  var options = {
    urlLength : 10
  };
  var result = linkify(["http://emberjs.com/", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank">http://emb...</a>' );
});

test('it should shorten a url by specified url length and adds 3 dots to the end in long url only', function(assert) {
  const longUrl  = 'https://guides.emberjs.com/v2.5.0/templates/writing-helpers/';
  const shortUrl = 'http://emberjs.com/';
  const options  = {
    urlLength : 20
  };
  const resultLongUrl = linkify([longUrl, "_blank"] , options ).toString().trim();
  assert.equal(resultLongUrl , '<a href="https://guides.emberjs.com/v2.5.0/templates/writing-helpers/" target="_blank">https://guides.ember...</a>' );

  const resultShortUrl = linkify([shortUrl, "_blank"] , options ).toString().trim();
  assert.equal(resultShortUrl, '<a href="http://emberjs.com/" target="_blank">http://emberjs.com/</a>' );
});

test('it should use the default scheme when no scheme is specified', function(assert) {
  const string = 'This link is missing a scheme: www.foo.com';
  const options = { defaultScheme: 'http' };
  const result = linkify([string], options).toString().trim();
  assert.equal(result, 'This link is missing a scheme: <a href="http://www.foo.com" target="_self">www.foo.com</a>');
});

test('default scheme should not override an existing scheme', function(assert) {
  const string = 'This link already has a scheme: https://www.foo.com';
  const options = { defaultScheme: 'http' };
  const result = linkify([string], options).toString().trim();
  assert.equal(result, 'This link already has a scheme: <a href="https://www.foo.com" target="_self">https://www.foo.com</a>');
});

test('it should turn a url into a link with a rel of "noopener"', function(assert) {
  var options = {
    rel : 'noopener'
  };
  var result = linkify(["http://emberjs.com/", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank" rel="noopener">http://emberjs.com/</a>' );
});

test('it should turn a url into a link with a class of "amilkey"', function(assert) {
  var options = {
    class : 'amilkey'
  };
  var result = linkify(["http://emberjs.com/", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank" class="amilkey">http://emberjs.com/</a>' );
});

test('it should turn a url into a link with a class of "amilkey" and a rel of "noopener""', function(assert) {
  var options = {
    rel   : 'noopener',
    class : 'amilkey'
  };
  var result = linkify(["http://emberjs.com/", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank" rel="noopener" class="amilkey">http://emberjs.com/</a>' );
});

test('it should turn a space delimited list of urls into seperate links', function(assert) {
  var result = linkify(['My link: http://google.com http://bing.com www.altavista.com']).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com" target="_self">http://google.com</a> <a href="http://bing.com" target="_self">http://bing.com</a> <a href="//www.altavista.com" target="_self">www.altavista.com</a>');
});

test('it should turn a comma delimited list of urls without slashes into seperate links by default', function(assert) {
  var result = linkify(['My link: http://google.com, http://bing.com,www.altavista.com']).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com" target="_self">http://google.com</a>, <a href="http://bing.com" target="_self">http://bing.com</a>,<a href="//www.altavista.com" target="_self">www.altavista.com</a>');
});

test('it should turn a comma delimited list of urls with slashes into seperate links', function(assert) {
  var options = {
    delimiter : ","
  };
  var result = linkify(["http://emberjs.com/,http://emberjs.com/really", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank">http://emberjs.com/</a>,<a href="http://emberjs.com/really" target="_blank">http://emberjs.com/really</a>' );
});

test('it should turn a period delimited list of urls with slashes into seperate links', function(assert) {
  var options = {
    delimiter : "."
  };
  var result = linkify(["http://emberjs.com/.http://emberjs.com/really.www.yes.really/", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank">http://emberjs.com/</a>.<a href="http://emberjs.com/really" target="_blank">http://emberjs.com/really</a>.<a href="//www.yes.really/" target="_blank">www.yes.really/</a>' );
});

test('it should turn a space delimited list of urls with slashes into seperate links even with delimiter . passed', function(assert) {
  var options = {
    delimiter : "."
  };
  var result = linkify(["http://emberjs.com/ http://emberjs.com/really www.yes.really/. www.yes.seriously", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank">http://emberjs.com/</a> <a href="http://emberjs.com/really" target="_blank">http://emberjs.com/really</a> <a href="//www.yes.really/" target="_blank">www.yes.really/</a>. <a href="//www.yes.seriously" target="_blank">www.yes.seriously</a>' );
});

test('it should turn a space delimited list of urls with slashes into seperate links even with delimiter , passed', function(assert) {
  var options = {
    delimiter : ","
  };
  var result = linkify(["http://emberjs.com/ http://emberjs.com/really www.yes.really/, www.yes.seriously", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank">http://emberjs.com/</a> <a href="http://emberjs.com/really" target="_blank">http://emberjs.com/really</a> <a href="//www.yes.really/" target="_blank">www.yes.really/</a>, <a href="//www.yes.seriously" target="_blank">www.yes.seriously</a>' );
});
