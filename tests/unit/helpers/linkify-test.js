import {
  linkify
} from 'ember-linkify/helpers/linkify';

module('LinkifyHelper');

test('it should turn a url into a link', function() {
  var result = linkify('My link: http://google.com').toString().trim();
  equal(result, 'My link: <a href="http://google.com">http://google.com</a>');
});

test('it should turn a url with www. into a link', function() {
  var result = linkify('www.johnotander.com').toString().trim();
  equal(result, '<a href="www.johnotander.com">www.johnotander.com</a>');
});

test('it should escape html', function() {
  var result = linkify('<h1>Some Html</h1>').toString().trim();
  equal(result, '&lt;h1&gt;Some Html&lt;/h1&gt;');
});

test('it should not allow script tags because bad', function() {
  var result = linkify('<script>alert("oh noes!");</script>').toString().trim();
  equal(result, '&lt;script&gt;alert(&quot;oh noes!&quot;);&lt;/script&gt;');
});

test('it should not link other attempted bad urls', function() {
  var result = linkify('http://javascript:alert(1)').toString().trim();
  equal(result, 'http://javascript:alert(1)');
});
