# ember-linkify [![Build Status](https://travis-ci.org/johnotander/ember-linkify.svg?branch=master)](https://travis-ci.org/johnotander/ember-linkify) [![Ember Observer Score](http://emberobserver.com/badges/ember-linkify.svg)](http://emberobserver.com/addons/ember-linkify)

Linkify URLs in an Ember app with a helper that uses a tested
[url-regex](https://github.com/kevva/url-regex) and Handlebars `Utils.escapeExpression`
to ensure links are safe.

## Installation

```
ember install ember-linkify
```

## Usage

```hbs
{{linkify post.description}}
```

```hbs
{{linkify commentText}}
```

##### Use the helper with a raw string

```hbs
{{linkify 'Here is a link: https://google.com and some attempted XSS <script>alert("xss!");</script>'}}
{{! => 'Here is a link: <a href="https://google.com">https://google.com</a> and some attempted XSS &lt;script&gt;alert(&quot;xss!&quot;);&lt;/script&gt;'}}
```

##### Or with a variable bound to an input

```hbs
{{textarea value=text placeholder='Enter some text with a url'}}
{{linkify text}}
```

##### You can specify options to the helper such as 'urlLength' which shortens the URL by 'urlLength' and add 3 dots to the end 


```hbs
{{linkify text urlLength=30}}
```


##### Also use options to specify attributes you want to add to the generated anchor tags. Currently, "rel" is the only recognized attribute.

```hbs
{{linkify text rel='nofollow'}}
```

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using `ember-cli`, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

***

> Crafted with <3 by [John Otander](http://johnotander.com)([@4lpine](https://twitter.com/4lpine)).
