package middlewares

import (
	"net/http"
)

type Adapter func(http.Handler) http.Handler

var adapters []Adapter = []Adapter{
	Limiter(),
}

func Adapt(mux http.Handler) http.Handler {
	for _, middleware := range adapters {
		mux = middleware(mux)
	}
	return mux
}
