var dom = require("jsonml-stringify/dom")
var unpack = require("unpack-element")
var document = require("global/document")
var url = require("url")
var HTML5Router = require("../index")

var page = dom(["ul", [
    { text: "Hello" },
    { text: "There" },
    { text: "Good day" },
    { text: "What is it?" }
].map(checkBox)])
var router = HTML5Router()
var elems = unpack(page)

Object.keys(elems.boxes).forEach(function (key) {
    var elem = elems.boxes[key]
    elem.addEventListener("click", function () {
        var checked = elems.checkBoxes[key].checked

        var uri = mergeUrl(router.getState().url, {
            query: { options: [key] }
        })
        var options = uri.query.options

        if (!checked && options.indexOf(key) !== -1) {
            options.splice(options.indexOf(key), 1)
        }

        router.replaceState({ url: url.format(uri) })
    })
})

document.body.appendChild(page)

router.on("route", function (opts) {
    var query = url.parse(opts.url, true).query

    if (query.options) {
        query.options.forEach(function (key) {
            elems.checkBoxes[key].checked = true
        })
    }
})

HTML5Router.on("popstate", router)
router()

function checkBox(opts) {
    return ["li", [
        ["label", { "data-marker": "boxes." + opts.text }, [
            ["input", {
                type: "checkbox",
                "data-marker": "checkBoxes." + opts.text
            }],
            opts.text
        ]]
    ]]
}

function mergeUrl(href, options) {
    var uri = url.parse(href, true)
    uri.search = null

    Object.keys(options.query).forEach(function (key) {
        var value = options.query[key]

        if (Array.isArray(value)) {
            uri.query[key] = uri.query[key] || []

            value.forEach(function (childValue) {
                if (uri.query[key].indexOf(childValue) === -1) {
                    uri.query[key].push(childValue)
                }
            })
        } else {
            uri.query[key] = value
        }
    })

    return uri
}
