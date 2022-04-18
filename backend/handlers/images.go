package handlers

import (
	"net/http"
)

func ServeImage(rw http.ResponseWriter, r *http.Request) {
	var fileName string = r.URL.Path[5:]
	http.ServeFile(rw, r, fileName)
}
