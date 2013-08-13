var http = require("http")
var ServeBrowserify = require("serve-browserify")
var stringify = require("jsonml-stringify")

var serveJS = ServeBrowserify({ root: __dirname })

var server = http.createServer(function (req, res) {
    if (req.url === "/browser.js") {
        serveJS(req, res)
    } else {
        res.end("<!DOCTYPE html>" + stringify(["html", [
            ["head", [
                ["title", "HTML5 Router example"]
            ]],
            ["body", [
                ["script", { src: "/browser.js" }]
            ]]
        ]]))
    }
})

server.listen(process.argv[2] || 9005, function () {
    console.log("listening on", server.address().port)
})
