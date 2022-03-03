package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"portfolio/handlers"
	"portfolio/middlewares"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handlers.RootHandler)
	finalHandler := middlewares.Adapt(mux)
	fmt.Println("Server has started!!!")
	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), finalHandler))
}
