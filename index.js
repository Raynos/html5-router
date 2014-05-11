var EventEmitter = require("events").EventEmitter
var Router = require("routes")
var extend = require("xtend/mutable")
var document = require("global/document")
var window = require("global/window")

initRouter()

module.exports = HTML5Router

function HTML5Router(opts) {
    opts = opts || {}
    var getState = opts.getState || defaultGetState
    var pushState = opts.pushState || defaultPushState
    var replaceState = opts.replaceState || defaultReplaceState

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
    window.history.pushState(state.data || {}, state.title || "", state.url)
}

function defaultReplaceState(state) {
    window.history.replaceState(state.data || {}, state.title || "", state.url)
}

function defaultGetState(ev) {
    return {
        data: ev ? ev.state : {},
        title: document.title,
        url: String(document.location)
    }
}

function initRouter() {
    extend(HTML5Router, EventEmitter.prototype)
    EventEmitter.call(HTML5Router)

    window.addEventListener("popstate", function (ev) {
        HTML5Router.emit("popstate", defaultGetState(ev))
    })
}
