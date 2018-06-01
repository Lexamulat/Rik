function start() {

    var Planets = new PlanetsContentClass();

    if (Planets.getLocalStor() == 0) {
        console.log("req")
        var RequestString = "https://rickandmortyapi.com/api/location/"

        var Getlocation = Planets.Request(RequestString);

        Planets.setContent(Getlocation.results);

        while (Getlocation.info.next != "") {

            RequestString = Getlocation.info.next
            Getlocation = Planets.Request(RequestString)
            Planets.setContent((Planets.getContent()).concat(Getlocation.results))
        }
        Planets.setLocalStor()
    } else {
        Planets.setContent(Planets.getLocalStor());
        console.log("cache")

    }



    // console.log(Planets.getContent())
    // console.log(JSON.stringify(Planets.getContent()))
    Planets.displayContent(Planets.getContent());

    Planets.addClicks();
}

window.onload = start;