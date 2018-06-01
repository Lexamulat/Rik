function ContentClass() {
    var content = {};
    //GENERAL METHODS
    this.someParentMethd = function() {
        console.log("someParentMethd")
    };

    this.popUp = function() {
        console.log("popUp")
    };

    this.popDown = function() {
        console.log("popDown")
    };

    this.setContent = function(inputContent) {
        content = inputContent
    };

    this.getContent = function() {
        return content;
    };

    this.showContent = function() {
        console.log("content: ", content)
    };
    //REDEFINED METHODS

    this.displayContent = function() {
        console.log("parent disp")
    };
}


function PlanetsContentClass() {
    ContentClass.call(this); // отнаследовать
    this.displayContent = function() {
        console.log("planets disp")
    };
}

function CharactersContentClass() {
    ContentClass.call(this); // отнаследовать
    this.displayContent = function() {
        console.log("characters disp")
        this.someParentMethd()
    };
}

function start() {

    var Planets = new PlanetsContentClass();
    var Characters = new CharactersContentClass();
    Planets.displayContent();
    Characters.displayContent();


    // console.log("plan cont")
    // Planets.setContent('plan');
    // Planets.showContent();

    // console.log("char cont")

    // Characters.setContent('char');
    // Characters.showContent();

    // console.log("plan cont")

    // Planets.showContent();
    // Planets.popUp();
    // Characters.popUp();
    // console.log(Planets.getContent())
    // Planets.showContent();

}










window.onload = start;