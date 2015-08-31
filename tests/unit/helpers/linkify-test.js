import {
  linkify
} from '../../../helpers/linkify';
import { module, test } from 'qunit';

module('Unit | Helper | linkify');

test('it should turn a url into a link', function(assert) {
  var result = linkify('My link: http://google.com').toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com" target="_self">http://google.com</a>');
});

test('it should turn a url with www. into a link', function(assert) {
  var result = linkify('www.johnotander.com').toString().trim();
  assert.equal(result, '<a href="//www.johnotander.com" target="_self">www.johnotander.com</a>');
});

test('it should escape html', function(assert) {
  var result = linkify('<h1>Some Html</h1>').toString().trim();
  assert.equal(result, '&lt;h1&gt;Some Html&lt;/h1&gt;');
});

test('it should not allow script tags because bad', function(assert) {
  var result = linkify('<script>alert("oh noes!");</script>').toString().trim();
  assert.equal(result, '&lt;script&gt;alert(&quot;oh noes!&quot;);&lt;/script&gt;');
});

test('it should not link other attempted bad urls', function(assert) {
  var result = linkify('http://javascript:alert(1)').toString().trim();
  assert.equal(result, 'http://javascript:alert(1)');
});

test('it should turn a url into a link with a target of "_blank"', function(assert) {
  var result = linkify("My link: http://google.com", "_blank").toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com" target="_blank">http://google.com</a>');
});
