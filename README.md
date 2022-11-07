# ember-linkify

Linkify URLs in an Ember app with a helper that uses a tested
[url-regex](https://github.com/kevva/url-regex) and Handlebars `Utils.escapeExpression`
to ensure links are safe.


## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


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

##### The 'defaultScheme' option specifies a scheme to use for URLs that don’t already have one.

For instance, the following will ensure that the `https` scheme is used for the created link:

```hbs
{{linkify 'Link without a scheme: www.foo.com' defaultScheme='https'}}
```

##### Also use options to specify attributes you want to add to the generated anchor tags. Currently, "target", "rel" and "class" are the only recognized attributes.

```hbs
{{linkify text target='_blank' rel='nofollow' class='external-link'}}
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

***

> Crafted with <3 by [John Otander](http://johnotander.com)([@4lpine](https://twitter.com/4lpine)).
