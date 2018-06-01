function start() {

    var Planets = new PlanetsContentClass();

    var RequestString = "https://rickandmortyapi.com/api/location/"

    var Getlocation = Planets.Request(RequestString);

    Planets.setContent(Getlocation.results);

    while (Getlocation.info.next != "") {

        RequestString = Getlocation.info.next
        Getlocation = Planets.Request(RequestString)
        Planets.setContent((Planets.getContent()).concat(Getlocation.results))
    }

    Planets.displayContent(Planets.getContent());

    Planets.addClicks();
}

window.onload = start;