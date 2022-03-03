package handlers

import (
	"net/http"
)

var routes []Route = []Route{
	NewRoute("/api/saveMessage", http.MethodPost, SaveMessage),
}

func RootHandler(rw http.ResponseWriter, r *http.Request) {
	p := r.URL.Path
	for _, route := range routes {
		if route.pattern.MatchString(p) && route.method == r.Method {
			route.handler(rw, r)
			return
		}
	}
	ServeFrontend(rw, r)
}
