type HistoryState := { url: String, title: String, data: Any }

type Router := EventEmitter<{
    "route": (HistoryState) => void
}> & {
    (state?: HistoryState) => void,
    addRoute: (
        pattern: String | RegExp,
        handler: (uri: String, {
            splats: Array,
            params: Object,
            data: Any,
            title: String
        }) => void
    ) => void,
    getState: () => HistoryState,
    pushState: (HistoryState) => void,
    replaceState: (HistoryState) => void
    (* methods go, get *)
}

html5-router := EventEmitter<{
    "popstate": (HistoryState) => void
}> & {
    (opts?: {
        html4?: Boolean,
        getState?: () => HistoryState,
        pushState?: (HistoryState) => void,
        replaceState?: (HistoryState) => void
        (* options? *)
    }) => Router
}
