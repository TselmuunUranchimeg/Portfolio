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
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), finalHandler))
}
