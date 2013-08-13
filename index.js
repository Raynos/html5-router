var EventEmitter = require("events").EventEmitter
var Router = require("routes")
var extend = require("xtend/mutable")
var History = require("html5-history")
var Html4History = require("html5-history/html4")
var window = require("global/window")

initRouter()

module.exports = HTML5Router

function HTML5Router(opts) {
    opts = opts || {}
    var getState = opts.getState || History.getState
    var pushState = opts.pushState || defaultPushState
    var replaceState = opts.replaceState || defaultReplaceState

    if (opts.html4) {
        Html4History.initHtml4()
    }

    var router = Router()

    onState.getState = getState
    onState.pushState = pushState
    onState.replaceState = replaceState
    onState.addRoute = router.addRoute.bind(router)

    extend(onState, EventEmitter.prototype)
    EventEmitter.call(onState)

    return onState

    function onState(state) {
        state = state || getState()

        var route = router.match(state.url)
        if (route) {
            route.fn(state.url, {
                params: route.params,
                splats: route.splats,
                title: state.title,
                data: state.data
            })
        }

        onState.emit("route", state)
    }
}

function defaultPushState(state) {
    History.pushState(state.data, state.title, state.url)
}

function defaultReplaceState(state) {
    History.replaceState(state.data, state.title, state.url)
}

function initRouter() {
    extend(HTML5Router, EventEmitter.prototype)
    EventEmitter.call(HTML5Router)

    History.Adapter.bind(window, "statechange", function () {
        HTML5Router.emit("popstate", History.getState())
    })
}
