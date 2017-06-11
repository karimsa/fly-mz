# fly-mz

Write `flyfile.js` with modern JS (ES2015+).

[![NPM](https://nodei.co/npm/fly-mz.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fly-mz/)

## Usage

To use, first install via npm (see above) and then just call fly normally.

You should now be able to write your `flyfile.js` with all the ES2015+ code
you want. For instance:

```javascript
const fly = require('fly-load')()

export default function* () {
  yield fly.source(/* do magic */)
}
```

### Advantages over `fly-esnext`

This project is based on the ideas of `fly-esnext`, but uses babel instead
of regexp. Due to this, you can space your code the way you like and you will
automatically have ES2015+ support and not just limited features (like async/await).

The only drawback to this is that on older versions of node that require more
transpiling (i.e. node v4), it will be marginally slower than using `fly-esnext`. But
the trade off is between the marginal performance and proper feature support.

`fly-mz` also uses proper contextualized script running so you can write regular node
code in your `flyfile.js` (like use `console.log()`) which is not supported by `fly-esnext`.

## License

Copyright (C) 2017 Karim Alibhai.

Licensed under MIT license.