# Typescript enabled API library

[![Greenkeeper badge](https://badges.greenkeeper.io/casual-solutions/type-api.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/casual-solutions/type-api.svg?branch=master)](https://travis-ci.org/casual-solutions/type-api)
[![NPM version](https://img.shields.io/npm/v/standard-version.svg)](https://www.npmjs.com/package/type-api)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


... TODO: Here will be description of the package ...


## Consumption of published library:

`yarn add type-api` or `npm install type-api`

### Webpack

... TODO: Update examples below ...

```ts
// main.ts
import { Greeter } from 'my-new-library';

const mountPoint = document.getElementById('app');
const App = () => {
  const greeter = new Greeter('Stranger');
  return `<h1>${greeter.greet()}</h1>`
}
const render = (Root: Function, where: HTMLElement) => {
  where.innerHTML = Root();
}

render(App, mountPoint);
```

```html
<html>
  <head>
    <script src="bundle.js" async></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

### UMD ( no bundler )

```html
<html>
  <head>
    <script src="node_modules/my-lib/umd/my-new-library.min.js"></script>
    <script async>
        var Greeter = MyLib.Greeter;

        var App = function() {
          var greeter = new Greeter('Stranger');
          return '<h1>'+greeter.greet()+'</h1>'
        }
        var render = function(Root, where) {
          where.innerHTML = Root();
        }

        render(App, mountPoint);
    </script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
