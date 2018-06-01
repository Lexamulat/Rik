function start() {

    var Planets = new PlanetsContentClass();

    var RequestString = "https://rickandmortyapi.com/api/location/"

    Planets.setContent(Planets.Request(RequestString))

    Planets.showContent();

}

window.onload = start;