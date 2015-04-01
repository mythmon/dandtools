Tools for playing and running D&D, because I'm lazy.

To make it go:

```shell
# Install build tools
$ npm install
# Start build tools
$ ./node_modules/.bin/gulp dev
# This will run forever
```

Now open http://localhost:8000/. As you change files, the browser should
live-reload. All the files that are actually loaded in the browser are in
`src/`, and get compiled into `build/`, which is where the browser loads them.
`.js` files in src can use ES6 features, including modules, and will be
compiled to ES5.
