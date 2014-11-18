# Linkify

Linkify urls in an Ember app with a helper and/or component. This uses a tested
[url-regex](https://github.com/kevva/url-regex) and Handlebars `Utils.escapeExpression`
to ensure links are safe.

Integrates with [ember-cli](http://ember-cli.com).

## Installation

```
npm i --save-dev ember-linkify
ember g ember-linkify
```

## Usage

Use the helper:

```hbs
{{linkify 'Here is a link: https://google.com and some attempted XSS <script>alert("xss!");</script>'}}
```

The proposed usage of the component, which is coming soon:

```hbs
{{linkify-component text=descriptionText}}
```

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
