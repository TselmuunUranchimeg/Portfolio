package main

import (
	"fmt"
	"log"
	"net/http"
	"portfolio/handlers"
	"portfolio/middlewares"

	"github.com/joho/godotenv"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handlers.RootHandler)
	finalHandler := middlewares.Adapt(mux)
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Server has started!!!")
	log.Fatal(http.ListenAndServe("localhost:8000", finalHandler))
}
