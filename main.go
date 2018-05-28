package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func Test(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/index.html")
	t.Execute(w, t)

}

func main() {

	router := mux.NewRouter()

	s := http.StripPrefix("/static/", http.FileServer(http.Dir("./static/")))

	router.HandleFunc("/", Test)

	router.PathPrefix("/static/").Handler(s)

	fmt.Println("test")
	log.Fatal(http.ListenAndServe(":9998", router))

}
