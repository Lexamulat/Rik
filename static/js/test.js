function ContentClass() {
    var content = {};

    this.popUp = function() {
        console.log("popUp")
    };

    this.popDown = function() {
        console.log("popDown")
    };
    this.setContent = function(inputContent) {
        content = inputContent
    };
    this.getContent = function(inputContent) {
        return content;

    };
    this.showContent = function(inputContent) {
        console.log("content: ", content)

    };
}


function PlanetsContentClass() {
    ContentClass.call(this); // отнаследовать
}

function CharactersContentClass() {
    ContentClass.call(this); // отнаследовать
}

function start() {

    var Planets = new PlanetsContentClass();
    var Characters = new CharactersContentClass();
    console.log("plan cont")
    Planets.setContent('plan');
    Planets.showContent();

    console.log("char cont")

    Characters.setContent('char');
    Characters.showContent();

    console.log("plan cont")

    Planets.showContent();
    Planets.popUp();
    Characters.popUp();
    // console.log(Planets.getContent())
    // Planets.showContent();

}










window.onload = start;