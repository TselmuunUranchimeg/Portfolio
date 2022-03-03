package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path"
	"regexp"

	"github.com/go-playground/validator/v10"
)

const Build = "build"

var Fs = http.FileServer(http.Dir("build"))

type Route struct {
	pattern *regexp.Regexp
	method  string
	handler http.HandlerFunc
}

func NewRoute(pattern, method string, handler http.HandlerFunc) Route {
	return Route{
		pattern: regexp.MustCompile(fmt.Sprintf("^%s[/]?$", pattern)),
		method:  method,
		handler: handler,
	}
}

func DecodeReqBody(body interface{}, r *http.Request, rw http.ResponseWriter) error {
	decoder := json.NewDecoder(r.Body)
	if jsonDecodeErr := decoder.Decode(body); jsonDecodeErr != nil {
		rw.Write([]byte("Can't decode data"))
		rw.WriteHeader(http.StatusBadRequest)
		return jsonDecodeErr
	}
	validate := validator.New()
	if validateErr := validate.Struct(body); validateErr != nil {
		message := []string{}
		for _, value := range validateErr.(validator.ValidationErrors) {
			message = append(message, value.Field())
		}
		data, marshalErr := json.Marshal(&message)
		if marshalErr != nil {
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write([]byte("Invalid data!!!"))
			return marshalErr
		}
		rw.WriteHeader(http.StatusNotAcceptable)
		rw.Write(data)
		return validateErr
	}
	return nil
}

func ServeFrontend(rw http.ResponseWriter, r *http.Request) {
	p := r.URL.Path
	_, statErr := os.Stat("build" + path.Clean(p))
	if statErr != nil {
		if !os.IsNotExist(statErr) {
			panic(statErr)
		}
		r.URL.Path = "/"
	}
	Fs.ServeHTTP(rw, r)
}
