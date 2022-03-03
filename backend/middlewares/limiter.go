package middlewares

import (
	"net/http"
	"time"

	"github.com/didip/tollbooth/v6"
	"github.com/didip/tollbooth/v6/limiter"
)

func limit(h http.Handler) func(rw http.ResponseWriter, r *http.Request) {
	return func(rw http.ResponseWriter, r *http.Request) {
		h.ServeHTTP(rw, r)
	}
}

var limitObj = tollbooth.NewLimiter(1, &limiter.ExpirableOptions{
	DefaultExpirationTTL: 20 * time.Minute,
})

func Limiter() Adapter {
	limitObj.
		SetIPLookups([]string{"RemoteAddr", "X-Forwarded-For", "X-Real-IP"}).
		SetMethods([]string{"POST", "GET"})
	return func(h http.Handler) http.Handler {
		return tollbooth.LimitFuncHandler(limitObj, limit(h))
	}
}
