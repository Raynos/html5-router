var test = require("tape")
var bind = require("function-bind")

Function.prototype.bind = bind

var HTML5Router = require("../index")

test("HTML5Router is a function", function (assert) {
    assert.equal(typeof HTML5Router, "function")
    assert.end()
})

test("HTML5Router set's route", function (assert) {
    var history = HistoryShim()
    var router = HTML5Router(history)

    router.pushState({ url: "/foo" })

    assert.equal(router.getState().url, "/foo")
    assert.end()
})

test("HTML5Router broadcasts initial route when called", function (assert) {
    var history = HistoryShim()
    var router = HTML5Router(history)

    router.addRoute("/", function (uri, opts) {
        assert.equal(uri, "/")
        assert.deepEqual(opts, {
            params: {},
            splats: [],
            data: {},
            title: ""
        })

        assert.end()
    })

    router()
})

function HistoryShim(uri) {
    uri = uri || "/"

    return {
        getState: getState, pushState: pushState, replaceState: replaceState
    }

    function getState() { return { data: {}, title: "", url: uri } }
    function pushState(state) { uri = state.url }
    function replaceState(state) { uri = state.url }
}
