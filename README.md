# html5-router

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

A uri router backed by html5 history api

## Example

```js
var Router = require("html5-router")

var router = Router()
router.addRoute("/", renderHome)
router.addRoute("/login", showLoginDialog)

router.on("route", function (event) {
  console.log("event", { url: event.url, data: event.data })
})

Router.on("popstate", router)
router()
```

## Installation

`npm install html5-router`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/html5-router.png
  [2]: https://travis-ci.org/Raynos/html5-router
  [3]: https://badge.fury.io/js/html5-router.png
  [4]: https://badge.fury.io/js/html5-router
  [5]: https://coveralls.io/repos/Raynos/html5-router/badge.png
  [6]: https://coveralls.io/r/Raynos/html5-router
  [7]: https://gemnasium.com/Raynos/html5-router.png
  [8]: https://gemnasium.com/Raynos/html5-router
  [9]: https://david-dm.org/Raynos/html5-router.png
  [10]: https://david-dm.org/Raynos/html5-router
  [11]: https://ci.testling.com/Raynos/html5-router.png
  [12]: https://ci.testling.com/Raynos/html5-router
